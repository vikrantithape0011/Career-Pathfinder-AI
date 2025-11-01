import { Router, Request, Response } from 'express';
import { auth } from '../middleware/auth.middleware';
import User from '../models/user.model';
import axios from 'axios';

const router = Router();

interface PsychometricAnswers {
  scores: Record<string, any>;
}

// Submit psychometric test
const submitPsychometric = async (req: Request<{}, {}, PsychometricAnswers>, res: Response): Promise<void> => {
  try {
    console.log('--- Psychometric Test Submission Debug ---');
    console.log('Received body:', req.body);
    console.log('User ID:', req.user?._id);
    const { scores } = req.body;
    if (!scores) {
      console.log('Missing scores in request body');
      res.status(400).json({ message: 'Missing scores' });
      return;
    }
    // Store only the scores and date, and remove old keys
    const update = {
      'testResults.psychometric.scores': scores,
      'testResults.psychometric.date': new Date(),
    };
    const unset = {
      'testResults.psychometric.personality': '',
      'testResults.psychometric.interests': '',
      'testResults.psychometric.skills': '',
    };
    console.log('Update object for findByIdAndUpdate:', { $set: update, $unset: unset });
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { $set: update, $unset: unset },
      { new: true }
    ).select('-password');
    console.log('User after update:', user);
    if (!user) {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user.testResults.psychometric);
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'Error submitting test', error });
  }
};

// Get test results
const getResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id)
      .select('testResults');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Extract the scores from the fetched test results
    const psychometricScores = user.testResults?.psychometric?.scores;

    let predictedCareers = [];

    // If scores exist, call the Python ML service
    if (psychometricScores) {
      try {
        const mlServiceUrl = 'http://127.0.0.1:5001/predict'; // URL of your Python Flask service
        const response = await axios.post(mlServiceUrl, { scores: psychometricScores });
        predictedCareers = response.data?.predicted_careers || [];
        console.log('ML service prediction successful:', predictedCareers);
      } catch (mlError) {
        console.error('Error calling ML service:', mlError);
        // Decide how to handle ML service errors: fail the request or return results without predictions
        // For now, we'll log and return results without predictions
      }
    }

    // Send the original test results along with the predicted careers
    res.json({ ...user.testResults, predictedCareers });

  } catch (error) {
    console.error('Error fetching test results or calling ML service:', error); // Added ML service error logging here too
    res.status(500).json({ message: 'Error fetching test results' });
  }
};

// Apply middleware
router.use(auth);

// Routes
router.post('/psychometric', submitPsychometric);
router.get('/results', getResults);

export default router; 