export interface Assessment {
  assessmentId: string;
  title: string;
  description: string;
  sections: AssessmentSection[];
}

export interface AssessmentSection {
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  questionId: string;
  questionText: string;
  questionType: string;
  timeLimit?: number;
  imageUrl?: string;
  followUpQuestion?: string;
  numberToMemorize?: string;
  options: QuestionOption[];
  correctAnswer?: string;
  hint?: string;
}

export interface QuestionOption {
  optionId: string;
  optionText: string;
  scoreContribution: {
    abilities?: { [key: string]: number };
    orientations?: { [key: string]: number };
  };
}

export interface TestState {
  currentSection: number;
  currentQuestion: number;
  answers: Record<string, string>;
  scores: {
    abilities: Record<string, number>;
    orientations: Record<string, number>;
  };
  showTimer: boolean;
  timeLeft: number;
  showImage: boolean;
  showNumber: boolean;
}

export interface Question {
  questionId: string;
  questionText: string;
  questionType: string;
  options: Array<{
    optionId: string;
    optionText: string;
    scoreContribution?: {
      abilities?: Record<string, number>;
      orientations?: Record<string, number>;
    };
  }>;
  imageUrl?: string;
  numberToMemorize?: string;
  requiresTimer?: boolean;
  hint?: string;
  followUpQuestion?: string;
}

export interface Section {
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  questions: Question[];
} 