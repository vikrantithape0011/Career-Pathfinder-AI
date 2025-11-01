import pandas as pd
import numpy as np
from typing import Dict, List, Tuple
import random
import seaborn as sns
import matplotlib.pyplot as plt

# Define abilities and orientations
ABILITIES = [
    'cognition', 'reasoning', 'figural_memory', 'spatial_ability',
    'verbal_ability', 'social_ability', 'numerical_ability', 'numerical_memory'
]

ORIENTATIONS = [
    'knowledge', 'practical', 'artistic', 'social', 'power_coping'
]

# Define correlated abilities and orientations
CORRELATED_PAIRS = [
    ('cognition', 'reasoning', 0.6),
    ('spatial_ability', 'artistic', 0.5),
    ('social_ability', 'social', 0.6),
    ('numerical_ability', 'practical', 0.5),
    ('verbal_ability', 'knowledge', 0.5),
    ('figural_memory', 'spatial_ability', 0.4),
    ('numerical_memory', 'numerical_ability', 0.4),
    ('social_ability', 'power_coping', 0.3)
]

# Define career categories and their required patterns
CAREER_PATTERNS = {
    # Traditional Indian Government Careers
    'IAS Officer': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'verbal_ability': 0.7, 'social_ability': 0.7},
        'orientations': {'knowledge': 0.8, 'power_coping': 0.7},
        'category': 'Government'
    },
    'IPS Officer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.8, 'social_ability': 0.8, 'power_coping': 0.8},
        'orientations': {'practical': 0.8, 'power_coping': 0.8},
        'category': 'Government'
    },
    'IFS Officer': {
        'abilities': {'verbal_ability': 0.8, 'social_ability': 0.8, 'cognition': 0.7},
        'orientations': {'knowledge': 0.8, 'social': 0.8},
        'category': 'Government'
    },
    'IRS Officer': {
        'abilities': {'numerical_ability': 0.8, 'reasoning': 0.7, 'cognition': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Government'
    },
    'IES Officer': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'numerical_ability': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'Government'
    },
    
    # IT/Software Careers
    'Software Engineer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.8, 'numerical_ability': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'IT'
    },
    'Data Scientist': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'numerical_ability': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'IT'
    },
    'AI Engineer': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'numerical_ability': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'IT'
    },
    'Cloud Architect': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'spatial_ability': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'IT'
    },
    'DevOps Engineer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.8, 'practical': 0.8},
        'orientations': {'practical': 0.9, 'knowledge': 0.7},
        'category': 'IT'
    },
    
    # Healthcare Careers
    'Medical Doctor': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'social_ability': 0.7},
        'orientations': {'knowledge': 0.8, 'social': 0.7},
        'category': 'Healthcare'
    },
    'Ayurvedic Doctor': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'social_ability': 0.7},
        'orientations': {'knowledge': 0.8, 'social': 0.7},
        'category': 'Healthcare'
    },
    'Homeopathic Doctor': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'social_ability': 0.7},
        'orientations': {'knowledge': 0.8, 'social': 0.7},
        'category': 'Healthcare'
    },
    'Dental Surgeon': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'spatial_ability': 0.8},
        'orientations': {'practical': 0.8, 'social': 0.7},
        'category': 'Healthcare'
    },
    'Ayurvedic Pharmacist': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'figural_memory': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Healthcare'
    },
    
    # Finance Careers
    'Chartered Accountant': {
        'abilities': {'numerical_ability': 0.8, 'reasoning': 0.7, 'cognition': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Finance'
    },
    'Investment Banker': {
        'abilities': {'numerical_ability': 0.8, 'reasoning': 0.8, 'social_ability': 0.7},
        'orientations': {'practical': 0.8, 'power_coping': 0.7},
        'category': 'Finance'
    },
    'Actuary': {
        'abilities': {'numerical_ability': 0.9, 'reasoning': 0.8, 'cognition': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'Finance'
    },
    'Financial Analyst': {
        'abilities': {'numerical_ability': 0.8, 'reasoning': 0.7, 'cognition': 0.7},
        'orientations': {'practical': 0.7, 'knowledge': 0.7},
        'category': 'Finance'
    },
    'Stock Market Trader': {
        'abilities': {'numerical_ability': 0.8, 'reasoning': 0.8, 'power_coping': 0.8},
        'orientations': {'practical': 0.8, 'power_coping': 0.8},
        'category': 'Finance'
    },
    
    # Creative Careers
    'UX Designer': {
        'abilities': {'spatial_ability': 0.7, 'social_ability': 0.7, 'cognition': 0.6},
        'orientations': {'artistic': 0.8, 'practical': 0.7},
        'category': 'Creative'
    },
    'Digital Artist': {
        'abilities': {'spatial_ability': 0.8, 'figural_memory': 0.7, 'artistic': 0.8},
        'orientations': {'artistic': 0.9, 'practical': 0.6},
        'category': 'Creative'
    },
    'Animation Artist': {
        'abilities': {'spatial_ability': 0.8, 'figural_memory': 0.8, 'artistic': 0.8},
        'orientations': {'artistic': 0.9, 'practical': 0.7},
        'category': 'Creative'
    },
    'Fashion Designer': {
        'abilities': {'spatial_ability': 0.8, 'artistic': 0.8, 'social_ability': 0.6},
        'orientations': {'artistic': 0.9, 'practical': 0.7},
        'category': 'Creative'
    },
    'Interior Designer': {
        'abilities': {'spatial_ability': 0.8, 'artistic': 0.7, 'social_ability': 0.6},
        'orientations': {'artistic': 0.8, 'practical': 0.7},
        'category': 'Creative'
    },
    
    # Emerging Careers
    'Blockchain Developer': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'numerical_ability': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'Emerging'
    },
    'Robotics Engineer': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'spatial_ability': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'Emerging'
    },
    'AR/VR Developer': {
        'abilities': {'spatial_ability': 0.8, 'cognition': 0.7, 'artistic': 0.6},
        'orientations': {'practical': 0.8, 'artistic': 0.7},
        'category': 'Emerging'
    },
    'Drone Pilot': {
        'abilities': {'spatial_ability': 0.8, 'cognition': 0.7, 'practical': 0.8},
        'orientations': {'practical': 0.9, 'knowledge': 0.7},
        'category': 'Emerging'
    },
    'Space Scientist': {
        'abilities': {'cognition': 0.9, 'reasoning': 0.8, 'numerical_ability': 0.8},
        'orientations': {'knowledge': 0.9, 'practical': 0.7},
        'category': 'Emerging'
    },
    
    # Lesser-known Careers
    'Ethical Hacker': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'numerical_ability': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'IT'
    },
    'Forensic Scientist': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'figural_memory': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'Science'
    },
    'Food Technologist': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'practical': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Science'
    },
    'Gemologist': {
        'abilities': {'spatial_ability': 0.8, 'figural_memory': 0.8, 'practical': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Science'
    },
    'Meteorologist': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'numerical_ability': 0.7},
        'orientations': {'knowledge': 0.8, 'practical': 0.7},
        'category': 'Science'
    },
    
    # Traditional Indian Careers
    'Vedic Scholar': {
        'abilities': {'verbal_ability': 0.8, 'cognition': 0.7, 'figural_memory': 0.7},
        'orientations': {'knowledge': 0.9, 'social': 0.7},
        'category': 'Traditional'
    },
    'Yoga Instructor': {
        'abilities': {'spatial_ability': 0.7, 'social_ability': 0.8, 'practical': 0.8},
        'orientations': {'social': 0.8, 'practical': 0.8},
        'category': 'Traditional'
    },
    'Astrologer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'numerical_ability': 0.7},
        'orientations': {'knowledge': 0.8, 'social': 0.7},
        'category': 'Traditional'
    },
    'Ayurvedic Therapist': {
        'abilities': {'social_ability': 0.8, 'practical': 0.8, 'cognition': 0.6},
        'orientations': {'social': 0.8, 'practical': 0.8},
        'category': 'Traditional'
    },
    'Vastu Consultant': {
        'abilities': {'spatial_ability': 0.8, 'reasoning': 0.7, 'social_ability': 0.6},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Traditional'
    },
    
    # Education Careers
    'School Teacher': {
        'abilities': {'verbal_ability': 0.8, 'social_ability': 0.8, 'cognition': 0.7},
        'orientations': {'social': 0.8, 'knowledge': 0.7},
        'category': 'Education'
    },
    'Professor': {
        'abilities': {'cognition': 0.8, 'verbal_ability': 0.8, 'knowledge': 0.8},
        'orientations': {'knowledge': 0.9, 'social': 0.7},
        'category': 'Education'
    },
    'Educational Counselor': {
        'abilities': {'social_ability': 0.8, 'verbal_ability': 0.7, 'cognition': 0.7},
        'orientations': {'social': 0.8, 'knowledge': 0.7},
        'category': 'Education'
    },
    'Special Educator': {
        'abilities': {'social_ability': 0.9, 'verbal_ability': 0.7, 'cognition': 0.7},
        'orientations': {'social': 0.9, 'practical': 0.7},
        'category': 'Education'
    },
    'Career Counselor': {
        'abilities': {'social_ability': 0.8, 'verbal_ability': 0.7, 'cognition': 0.7},
        'orientations': {'social': 0.8, 'knowledge': 0.7},
        'category': 'Education'
    },
    
    # Legal Careers
    'Lawyer': {
        'abilities': {'verbal_ability': 0.8, 'reasoning': 0.8, 'cognition': 0.7},
        'orientations': {'knowledge': 0.8, 'social': 0.7},
        'category': 'Legal'
    },
    'Judge': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.9, 'verbal_ability': 0.8},
        'orientations': {'knowledge': 0.9, 'power_coping': 0.8},
        'category': 'Legal'
    },
    'Legal Advisor': {
        'abilities': {'verbal_ability': 0.8, 'reasoning': 0.7, 'social_ability': 0.7},
        'orientations': {'knowledge': 0.8, 'social': 0.7},
        'category': 'Legal'
    },
    'Corporate Lawyer': {
        'abilities': {'verbal_ability': 0.8, 'reasoning': 0.8, 'social_ability': 0.7},
        'orientations': {'knowledge': 0.8, 'power_coping': 0.7},
        'category': 'Legal'
    },
    'Criminal Lawyer': {
        'abilities': {'verbal_ability': 0.8, 'reasoning': 0.8, 'social_ability': 0.8},
        'orientations': {'knowledge': 0.8, 'power_coping': 0.8},
        'category': 'Legal'
    },
    
    # Agriculture Careers
    'Agricultural Scientist': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'practical': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Agriculture'
    },
    'Horticulturist': {
        'abilities': {'spatial_ability': 0.7, 'practical': 0.8, 'cognition': 0.6},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Agriculture'
    },
    'Agricultural Engineer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.7, 'practical': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Agriculture'
    },
    'Organic Farmer': {
        'abilities': {'practical': 0.8, 'cognition': 0.6, 'social_ability': 0.6},
        'orientations': {'practical': 0.9, 'knowledge': 0.6},
        'category': 'Agriculture'
    },
    'Agricultural Economist': {
        'abilities': {'numerical_ability': 0.7, 'reasoning': 0.7, 'cognition': 0.7},
        'orientations': {'practical': 0.7, 'knowledge': 0.7},
        'category': 'Agriculture'
    },
    
    # Defense Careers
    'Army Officer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.8, 'power_coping': 0.9},
        'orientations': {'practical': 0.8, 'power_coping': 0.9},
        'category': 'Defense'
    },
    'Navy Officer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.8, 'spatial_ability': 0.8},
        'orientations': {'practical': 0.8, 'power_coping': 0.8},
        'category': 'Defense'
    },
    'Air Force Officer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.8, 'spatial_ability': 0.8},
        'orientations': {'practical': 0.8, 'power_coping': 0.8},
        'category': 'Defense'
    },
    'Defense Scientist': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'numerical_ability': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'Defense'
    },
    'Military Engineer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.8, 'practical': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Defense'
    },

    # Emerging Tech Careers
    'AI/ML Specialist': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'numerical_ability': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'Emerging'
    },
    'Quantum Computing Engineer': {
        'abilities': {'cognition': 0.9, 'reasoning': 0.8, 'numerical_ability': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.9},
        'category': 'Emerging'
    },
    'Cybersecurity Analyst': {
        'abilities': {'cognition': 0.8, 'reasoning': 0.8, 'figural_memory': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.8},
        'category': 'Emerging'
    },
    'Digital Health Specialist': {
        'abilities': {'cognition': 0.7, 'social_ability': 0.8, 'numerical_ability': 0.7},
        'orientations': {'practical': 0.8, 'social': 0.8},
        'category': 'Emerging'
    },
    'Green Energy Engineer': {
        'abilities': {'cognition': 0.7, 'reasoning': 0.8, 'practical': 0.8},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Emerging'
    },
    
    # Emerging Business Careers
    'Digital Marketing Strategist': {
        'abilities': {'social_ability': 0.8, 'verbal_ability': 0.7, 'numerical_ability': 0.6},
        'orientations': {'practical': 0.7, 'artistic': 0.6},
        'category': 'Emerging'
    },
    'E-commerce Specialist': {
        'abilities': {'numerical_ability': 0.7, 'social_ability': 0.7, 'cognition': 0.6},
        'orientations': {'practical': 0.8, 'knowledge': 0.6},
        'category': 'Emerging'
    },
    'Sustainability Consultant': {
        'abilities': {'cognition': 0.7, 'social_ability': 0.7, 'practical': 0.7},
        'orientations': {'practical': 0.8, 'social': 0.7},
        'category': 'Emerging'
    },
    'FinTech Specialist': {
        'abilities': {'numerical_ability': 0.8, 'cognition': 0.7, 'reasoning': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Emerging'
    },
    'Business Intelligence Analyst': {
        'abilities': {'numerical_ability': 0.8, 'cognition': 0.7, 'reasoning': 0.7},
        'orientations': {'practical': 0.8, 'knowledge': 0.7},
        'category': 'Emerging'
    }
}

def generate_scores(career_pattern: Dict) -> Tuple[List[float], List[float]]:
    """Generate realistic scores based on career pattern and correlations."""
    abilities_scores = []
    orientations_scores = []
    
    # Generate base scores
    base_scores = {}
    
    # Generate ability scores with correlations
    for ability in ABILITIES:
        if ability in career_pattern['abilities']:
            base_score = career_pattern['abilities'][ability] * 100
            variance = random.uniform(-10, 10)
            base_scores[ability] = max(1, min(100, base_score + variance))
        else:
            base_scores[ability] = random.uniform(40, 80)
    
    # Apply correlations
    for ability1, ability2, correlation in CORRELATED_PAIRS:
        if ability1 in base_scores and ability2 in base_scores:
            # Adjust scores based on correlation
            score1 = base_scores[ability1]
            score2 = base_scores[ability2]
            target_diff = (score1 - score2) * correlation
            base_scores[ability2] = score2 + target_diff
    
    # Generate orientation scores with correlations
    base_orientations = {}
    for orientation in ORIENTATIONS:
        if orientation in career_pattern['orientations']:
            base_score = career_pattern['orientations'][orientation] * 100
            variance = random.uniform(-10, 10)
            base_orientations[orientation] = max(1, min(100, base_score + variance))
        else:
            base_orientations[orientation] = random.uniform(40, 80)
    
    # Apply orientation correlations
    for ability, orientation, correlation in CORRELATED_PAIRS:
        if ability in base_scores and orientation in base_orientations:
            score1 = base_scores[ability]
            score2 = base_orientations[orientation]
            target_diff = (score1 - score2) * correlation
            base_orientations[orientation] = score2 + target_diff
    
    # Convert to lists
    abilities_scores = [base_scores[ability] for ability in ABILITIES]
    orientations_scores = [base_orientations[orientation] for orientation in ORIENTATIONS]
    
    return abilities_scores, orientations_scores

def generate_dataset(num_samples: int = 29000) -> pd.DataFrame:
    """Generate the complete dataset."""
    data = []
    
    # Calculate samples per career for balanced distribution
    careers = list(CAREER_PATTERNS.keys())
    samples_per_career = num_samples // len(careers)
    remaining_samples = num_samples % len(careers)
    
    for career in careers:
        num_career_samples = samples_per_career + (1 if remaining_samples > 0 else 0)
        remaining_samples -= 1
        
        for _ in range(num_career_samples):
            abilities_scores, orientations_scores = generate_scores(CAREER_PATTERNS[career])
            row = abilities_scores + orientations_scores + [career]
            data.append(row)
    
    # Create DataFrame
    columns = ABILITIES + ORIENTATIONS + ['career']
    df = pd.DataFrame(data, columns=columns)
    
    # Shuffle the dataset
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    return df

def analyze_correlations(df: pd.DataFrame):
    """Analyze correlations between abilities and orientations."""
    # Create correlation matrix
    features = ABILITIES + ORIENTATIONS
    corr_matrix = df[features].corr()
    
    # Print correlation matrix
    print("\nCorrelation Matrix:")
    print(corr_matrix)
    
    # Find strong correlations (absolute value > 0.5)
    strong_correlations = []
    for i in range(len(features)):
        for j in range(i+1, len(features)):
            corr = corr_matrix.iloc[i, j]
            if abs(corr) > 0.5:  # Strong correlation threshold
                strong_correlations.append((features[i], features[j], corr))
    
    print("\nStrong Correlations (|correlation| > 0.5):")
    for feat1, feat2, corr in sorted(strong_correlations, key=lambda x: abs(x[2]), reverse=True):
        print(f"{feat1} - {feat2}: {corr:.3f}")
    
    # Create correlation heatmap
    plt.figure(figsize=(12, 10))
    sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0)
    plt.title('Correlation Heatmap of Abilities and Orientations')
    plt.tight_layout()
    plt.savefig('correlation_heatmap.png')
    plt.close()

def analyze_career_patterns(df: pd.DataFrame):
    """Analyze patterns in career requirements."""
    print("\nCareer Pattern Analysis:")
    
    # Calculate average scores for each career
    career_means = df.groupby('career')[ABILITIES + ORIENTATIONS].mean()
    
    # Find careers with highest scores in each ability/orientation
    for feature in ABILITIES + ORIENTATIONS:
        top_careers = career_means.nlargest(3, feature)
        print(f"\nTop 3 careers for {feature}:")
        for career, score in top_careers[feature].items():
            print(f"  {career}: {score:.2f}")
    
    # Calculate standard deviations to understand score variability
    career_std = df.groupby('career')[ABILITIES + ORIENTATIONS].std()
    print("\nCareers with highest score variability:")
    for feature in ABILITIES + ORIENTATIONS:
        top_variability = career_std.nlargest(3, feature)
        print(f"\n{feature}:")
        for career, std in top_variability[feature].items():
            print(f"  {career}: {std:.2f}")

def main():
    # Generate dataset
    print("Generating dataset with 500 samples per career...")
    df = generate_dataset(29000)  # 58 careers × 500 samples = 29,000 total samples
    
    # Save dataset
    print("Saving dataset...")
    df.to_csv('src/data/career_dataset.csv', index=False)
    
    # Print dataset statistics
    print(f"\nDataset generated successfully with {len(df)} samples")
    print("\nCareer distribution:")
    print(df['career'].value_counts())
    
    print("\nScore ranges:")
    for col in ABILITIES + ORIENTATIONS:
        print(f"{col}: {df[col].min():.1f} - {df[col].max():.1f}")
    
    # Analyze correlations
    print("\nAnalyzing correlations...")
    analyze_correlations(df)
    
    # Analyze career patterns
    print("\nAnalyzing career patterns...")
    analyze_career_patterns(df)
    
    print("\nDataset generation completed!")

if __name__ == "__main__":
    main() 