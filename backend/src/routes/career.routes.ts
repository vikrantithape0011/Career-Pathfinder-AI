import { Router, Request, Response } from 'express';
import { auth } from '../middleware/auth.middleware';
import User from '../models/user.model'; // Import the User model
import axios from 'axios'; // Import axios for making HTTP requests
import * as fs from 'fs'; // Import fs module
import * as path from 'path'; // Import path module
import NodeCache from 'node-cache';

const router = Router();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

interface SearchQuery {
  query?: string;
}

interface RoadmapParams {
  careerId: string;
}

// Helper function to load and parse dataset
const loadDataset = () => {
  const datasetPath = path.join(__dirname, '..', '..', 'Dataset.json');
  const datasetData = fs.readFileSync(datasetPath, 'utf-8');
  return JSON.parse(datasetData);
};

// Helper function to create search index
const createSearchIndex = (careers: any[]) => {
  const index: { [key: string]: any[] } = {};
  
  careers.forEach(career => {
    const title = career.title?.toLowerCase() || '';
    const description = career.Description?.toLowerCase() || '';
    const skills = (career.Skills || []).map((s: string) => s.toLowerCase());
    const category = career.category?.toLowerCase() || '';
    
    // Create title words index
    title.split(/\s+/).forEach((word: string) => {
      if (word.length > 2) { // Ignore very short words
        if (!index[word]) index[word] = [];
        index[word].push(career);
      }
    });
    
    // Create description words index
    description.split(/\s+/).forEach((word: string) => {
      if (word.length > 2) {
        if (!index[word]) index[word] = [];
        index[word].push(career);
      }
    });
    
    // Create skills index
    skills.forEach((skill: string) => {
      if (!index[skill]) index[skill] = [];
      index[skill].push(career);
    });
    
    // Create category index
    if (category) {
      if (!index[category]) index[category] = [];
      index[category].push(career);
    }
  });
  
  return index;
};

// Initialize search index
let searchIndex: { [key: string]: any[] } | null = null;
let careersList: any[] = [];

try {
  const dataset = loadDataset();
  careersList = Array.isArray(dataset.careers) ? dataset.careers : Object.values(dataset);
  searchIndex = createSearchIndex(careersList);
} catch (error) {
  console.error('Error initializing search index:', error);
}

// Search careers with optimized algorithm
const searchCareers = async (req: Request<{}, {}, {}, SearchQuery>, res: Response): Promise<void> => {
  try {
    const { query: encodedQuery } = req.query;
    const searchQuery = encodedQuery ? decodeURIComponent(encodedQuery).toLowerCase() : '';

    // Check cache first
    const cacheKey = `search_${searchQuery}`;
    const cachedResults = cache.get(cacheKey);
    if (cachedResults) {
      res.json(cachedResults);
      return;
    }

    if (!searchIndex || !careersList) {
      throw new Error('Search index not initialized');
    }

    // Split search query into words
    const searchWords = searchQuery.split(/\s+/).filter(word => word.length > 2);
    
    // If no valid search words, return all careers
    if (searchWords.length === 0) {
      res.json(careersList);
      return;
    }

    // Score each career based on matches
    const careerScores = new Map();
    
    searchWords.forEach(word => {
      // Find careers that match this word
      const matchingCareers = searchIndex[word] || [];
      
      matchingCareers.forEach(career => {
        const currentScore = careerScores.get(career) || 0;
        
        // Score based on where the match was found
        let score = currentScore;
        const title = career.title?.toLowerCase() || '';
        const description = career.Description?.toLowerCase() || '';
        const skills = (career.Skills || []).map((s: string) => s.toLowerCase());
        
        if (title.includes(word)) score += 3; // Title matches are most important
        if (description.includes(word)) score += 2; // Description matches are next
        if (skills.includes(word)) score += 1; // Skill matches are also relevant
        
        careerScores.set(career, score);
      });
    });

    // Convert to array and sort by score
    const results = Array.from(careerScores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([career]) => career);

    // Cache the results
    cache.set(cacheKey, results);

    res.json(results);
  } catch (error: any) {
    console.error('Error searching careers:', error);
    res.status(500).json({ message: 'Error searching careers', error: error.message });
  }
};

// Get career recommendations
const getRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure user is authenticated and user ID is available
    if (!req.user || !req.user._id) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const userId = req.user._id;

    // Find the user and get their latest test scores
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const scores = user.testResults?.psychometric?.scores;

    if (!scores || !scores.abilities || !scores.orientations) {
      res.status(400).json({ message: 'No test scores found for this user' });
      return;
    }

    // Prepare scores for the ML model (assuming the ML model expects snake_case keys)
    const mlInputScores = {
      cognition: scores.abilities.cognition,
      reasoning: scores.abilities.reasoning,
      figural_memory: scores.abilities.figuralMemory,
      spatial_ability: scores.abilities.spatialAbility,
      verbal_ability: scores.abilities.verbalAbility,
      social_ability: scores.abilities.socialAbility,
      numerical_ability: scores.abilities.numericalAbility,
      numerical_memory: scores.abilities.numericalMemory,
      knowledge: scores.orientations.knowledge,
      practical: scores.orientations.practical,
      artistic: scores.orientations.artistic,
      social: scores.orientations.social,
      power_coping: scores.orientations.powerCopingStyle,
    };

    // Call the external ML model prediction service
    const ML_MODEL_PREDICT_URL = 'http://127.0.0.1:5001/predict'; // Define the ML model URL
    const mlResponse = await axios.post(ML_MODEL_PREDICT_URL, { scores: mlInputScores });

    const predictedCareerTitles: string[] = mlResponse.data?.predicted_careers || [];

    // Save the predicted careers to the user's recommendedCareers, taking top 5 and avoiding duplicates
    if (predictedCareerTitles.length > 0) {
      // Take the top 5 predicted careers
      const top5Careers = predictedCareerTitles.slice(0, 5);

      // Filter out careers that are already in recommendedCareers
      const newRecommendedCareers = top5Careers.filter(career => 
        !user.recommendedCareers.includes(career)
      );

      // Add new recommended careers to the existing array
      user.recommendedCareers = [...user.recommendedCareers, ...newRecommendedCareers];

      await user.save();
      console.log(`Saved ${newRecommendedCareers.length} new recommended careers for user ${userId}: ${newRecommendedCareers.join(', ')}`);
    }

    // Return the recommended careers (top 5 from the model output) and the user's saved careers
    res.json({ recommendedCareers: predictedCareerTitles.slice(0, 5), savedCareers: user.savedCareers });
  } catch (error) {
    console.error('Error getting or saving recommendations:', error);
    res.status(500).json({ message: 'Failed to get or save recommendations' });
  }
};

// Get career roadmap
const getRoadmap = async (req: Request<RoadmapParams>, res: Response): Promise<void> => {
  try {
    const { careerId } = req.params;
    // TODO: Implement career roadmap logic
    res.json({
      careerId,
      steps: []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting career roadmap' });
  }
};

// Save a career
const saveCareer = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure user is authenticated and user ID is available
    if (!req.user || !req.user._id) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const userId = req.user._id;
    const { careerTitle } = req.body; // Get the career title from the request body

    if (!careerTitle) {
      res.status(400).json({ message: 'Career title is required' });
      return;
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if the career is already in savedCareers to avoid duplicates
    // Note: savedCareers is intended for ObjectIds, but we are currently saving strings.
    // This check assumes we are comparing string titles.
    const careerAlreadySaved = user.savedCareers.some(savedCareer => savedCareer.toString() === careerTitle);

    if (careerAlreadySaved) {
      res.status(409).json({ message: 'Career already saved' });
      return;
    }

    // Add the career title to the savedCareers array
    user.savedCareers.push(careerTitle as any); // Cast to any to bypass potential type issues if schema is ObjectId[]

    await user.save();
    console.log(`User ${userId} saved career: ${careerTitle}`);

    res.status(200).json({ message: 'Career saved successfully' });

  } catch (error) {
    console.error('Error saving career:', error);
    res.status(500).json({ message: 'Failed to save career' });
  }
};

// Remove a saved career
const removeSavedCareer = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure user is authenticated and user ID is available
    if (!req.user || !req.user._id) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const userId = req.user._id;
    const { careerTitle } = req.params; // Get the career title from URL parameters

    if (!careerTitle) {
      res.status(400).json({ message: 'Career title is required in parameters' });
      return;
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Filter out the career to be removed
    const initialSavedCareersCount = user.savedCareers.length;
    user.savedCareers = user.savedCareers.filter(career => career !== careerTitle);

    // Check if a career was actually removed
    if (user.savedCareers.length === initialSavedCareersCount) {
      res.status(404).json({ message: 'Career not found in saved list' });
      return;
    }

    await user.save();
    console.log(`User ${userId} removed saved career: ${careerTitle}`);

    res.status(200).json({ message: 'Career removed successfully' });

  } catch (error) {
    console.error('Error removing saved career:', error);
    res.status(500).json({ message: 'Failed to remove saved career' });
  }
};

// Get career path details by title
const getCareerPath = async (req: Request, res: Response): Promise<void> => {
  const { careerTitle: encodedCareerTitle } = req.params;
  try {
    // Decode the URL parameter
    const careerTitle = decodeURIComponent(encodedCareerTitle);

    const datasetPath = path.join(__dirname, '..', '..', 'Dataset.json');
    const datasetData = fs.readFileSync(datasetPath, 'utf-8');
    const dataset = JSON.parse(datasetData);

    // Assuming dataset has a 'careers' array directly at the top level
    // If dataset.careers exists and is an array, use that.
    // Otherwise, use Object.values(dataset) as a fallback (for older structure).
    const careersList = Array.isArray(dataset.careers) ? dataset.careers : Object.values(dataset);

    const career = careersList.find((item: any) => 
      item.title.toLowerCase().replace(/\s+/g, '-') === careerTitle.toLowerCase()
    ) as { education_paths: any[] } | undefined;

    if (career) {
      // Return the entire career object
      res.json(career);
    } else {
      res.status(404).json({ message: 'Career path not found for this title' });
    }
  } catch (error: any) {
    console.error('Error fetching career path:', error);
    res.status(500).json({ message: 'Error fetching career path', error: error.message });
  }
};

// Apply middleware
router.use(auth);

// Routes
router.get('/search', searchCareers);
router.get('/recommendations', getRecommendations);
router.get('/:careerId/roadmap', getRoadmap);
router.post('/save', saveCareer);
router.delete('/saved/:careerTitle', removeSavedCareer);
router.get('/path/:careerTitle', getCareerPath);

export default router; 