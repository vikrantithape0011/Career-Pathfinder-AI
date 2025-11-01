import { Assessment, AssessmentSection, AssessmentQuestion } from '../types/assessment';

export class QuestionRandomizer {
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private static shuffleSection(section: AssessmentSection): AssessmentSection {
    return {
      ...section,
      questions: this.shuffleArray(section.questions)
    };
  }

  public static randomizeAssessment(assessment: Assessment): Assessment {
    const shuffledSections = assessment.sections.map(section => this.shuffleSection(section));
    
    return {
      ...assessment,
      sections: shuffledSections
    };
  }

  public static getRandomQuestions(
    assessment: Assessment,
    questionsPerSection: number
  ): Assessment {
    const randomizedAssessment = this.randomizeAssessment(assessment);
    
    const limitedSections = randomizedAssessment.sections.map(section => ({
      ...section,
      questions: section.questions.slice(0, questionsPerSection)
    }));

    return {
      ...randomizedAssessment,
      sections: limitedSections
    };
  }
} 