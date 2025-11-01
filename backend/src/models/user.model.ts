import { Document, Schema, model, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  interests: string[];
  notifications: boolean;
  emailUpdates: boolean;
  savedCareers: string[];
  recommendedCareers: string[];
  testResults: {
    psychometric?: {
      scores?: {
        abilities?: { 
          cognition: Number, 
          reasoning: Number, 
          figuralMemory: Number, 
          spatialAbility: Number, 
          verbalAbility: Number, 
          numericalAbility: Number, 
          numericalMemory: Number, 
          socialAbility: Number
        },
        orientations?: { 
          knowledge: Number, 
          practical: Number, 
          artistic: Number, 
          social: Number, 
          powerCopingStyle: Number 
        }
      },
      date?: Date
    };
  };
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  interests: [{
    type: String,
    default: [],
  }],
  notifications: {
    type: Boolean,
    default: true,
  },
  emailUpdates: {
    type: Boolean,
    default: true,
  },
  savedCareers: { type: [String], default: [] },
  recommendedCareers: [{
    type: String,
    default: [],
  }],
  testResults: {
    psychometric: {
      scores: {
        abilities: { 
          cognition: Number, 
          reasoning: Number, 
          figuralMemory: Number, 
          spatialAbility: Number, 
          verbalAbility: Number, 
          numericalAbility: Number, 
          numericalMemory: Number, 
          socialAbility: Number
        },
        orientations: { 
          knowledge: Number, 
          practical: Number, 
          artistic: Number, 
          social: Number, 
          powerCopingStyle: Number 
        }
      },
      date: Date
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(this: IUser, next: (err?: CallbackError) => void) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser>('User', userSchema); 