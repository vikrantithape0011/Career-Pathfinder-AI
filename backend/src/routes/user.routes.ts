import { Router, Request, Response } from 'express';
import { auth } from '../middleware/auth.middleware';
import User from '../models/user.model';

const router = Router();

interface UpdateProfileBody {
  name?: string;
  email?: string;
  interests?: string[];
  notifications?: boolean;
  emailUpdates?: boolean;
}

interface SaveCareerBody {
  careerId: string;
}

// Get user profile
const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// Update user profile
const updateProfile = async (req: Request<{}, {}, UpdateProfileBody>, res: Response): Promise<void> => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { $set: updates },
      { new: true }
    ).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Save career to user's list
const saveCareer = async (req: Request<{}, {}, SaveCareerBody>, res: Response): Promise<void> => {
  try {
    const { careerId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { $addToSet: { savedCareers: careerId } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error saving career' });
  }
};

// Get user's saved careers
const getSavedCareers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id)
      .select('savedCareers')
      .populate('savedCareers');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user.savedCareers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved careers' });
  }
};

// Apply middleware
router.use(auth);

// Routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/careers', saveCareer);
router.get('/careers', getSavedCareers);

export default router; 