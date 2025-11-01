export interface AbilityScores {
  figuralMemory: number;
  reasoning: number;
  spatialAbility: number;
  verbalAbility: number;
  numericalAbility: number;
  numericalMemory: number;
  socialAbility: number;
  cognition: number;
}

export interface OrientationScores {
  knowledge: number;
  practical: number;
  artistic: number;
  social: number;
  powerCopingStyle: number;
}

export class ScoreCalculator {
  // Calculate ability scores: (scored / 10) * 100
  static calculateAbilityScores(rawAbilityScores: { [key in keyof AbilityScores]: number }): { [key in keyof AbilityScores]: number } {
    const result: { [key: string]: number } = {};
    // Iterate directly over the provided raw scores
    Object.entries(rawAbilityScores).forEach(([ability, score]) => {
      // (scored / 10) * 100
      // Ensure score is treated as a number, default to 0 if undefined/null
      const numericScore = score || 0;
      result[ability] = Math.round((numericScore / 10) * 100);
    });
    return result as { [key in keyof AbilityScores]: number };
  }

  /**
   * Calculate orientation scores: (scored / maxPossible) * 100
   * Updated to accept raw scores object instead of answers array
   * @param rawOrientationScores Object with raw score for each orientation
   * @param maxScores Object with max possible score for each orientation
   */
  static calculateOrientationScores(
    rawOrientationScores: { [key in keyof OrientationScores]: number },
    maxScores: { [key in keyof OrientationScores]: number }
  ): { [key in keyof OrientationScores]: number } {
    const result: { [key: string]: number } = {};
    // Iterate directly over the provided raw scores
    Object.entries(rawOrientationScores).forEach(([orientation, score]) => {
      // Ensure score is treated as a number, default to 0 if undefined/null
       const numericScore = score || 0;
      const max = maxScores[orientation as keyof OrientationScores] || 1;
      // Prevent division by zero if max is 0 (shouldn't happen with computeMaxOrientationScores but as a safeguard)
      result[orientation] = Math.round((numericScore / (max > 0 ? max : 1)) * 100);
    });
    return result as { [key in keyof OrientationScores]: number };
  }

  /**
   * Helper to compute max possible scores for each orientation from assessment data
   * This function remains the same as it processes the assessment data structure.
   * @param assessment Assessment data object
   * @returns Object with max possible score for each orientation
   */
  static computeMaxOrientationScores(assessment: any): { [key in keyof OrientationScores]: number } {
    const maxScores: { [key: string]: number } = {
      knowledge: 0,
      practical: 0,
      artistic: 0,
      social: 0,
      powerCopingStyle: 0
    };
    // Find orientation section
    const orientationSection = assessment.sections.find((s: any) => s.sectionId === 'orientation-assessment');
    if (!orientationSection) return maxScores as { [key in keyof OrientationScores]: number };
    orientationSection.questions.forEach((q: any) => {
      // For each orientation, find the max score in this question
      const orientationMax: { [key: string]: number } = {};
      q.options.forEach((opt: any) => {
        if (opt.scoreContribution && opt.scoreContribution.orientations) {
          Object.entries(opt.scoreContribution.orientations).forEach(([orientation, score]) => {
            orientationMax[orientation] = Math.max(orientationMax[orientation] || 0, score as number);
          });
        }
      });
      // Add the max for each orientation in this question
      Object.entries(orientationMax).forEach(([orientation, score]) => {
        maxScores[orientation] = (maxScores[orientation] || 0) + score;
      });
    });
    return maxScores as { [key in keyof OrientationScores]: number };
  }
} 