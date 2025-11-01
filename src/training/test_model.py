import joblib
import numpy as np
import pandas as pd
import shap
from pathlib import Path
import warnings
from typing import List, Dict
import matplotlib.pyplot as plt
import pickle

# Suppress warnings
warnings.filterwarnings('ignore')

# Define feature names (matching training data)
FEATURE_NAMES = [
    'analytical_skill', 'communication_skill', 'creativity', 'detail_orientation',
    'emotional_intelligence', 'leadership', 'logical_reasoning', 'mechanical_aptitude',
    'memory', 'numerical_ability', 'physical_stamina', 'problem_solving',
    'social_skills', 'spatial_ability', 'verbal_ability'
]

# Define career labels
CAREER_LABELS = [
    'Accountant', 'Actuary', 'Animation Artist', 'Architect', 'Army Officer',
    'Astronomer', 'Astrophysicist', 'Athlete', 'Audiologist', 'Banker',
    'Biochemist', 'Biomedical Engineer', 'Biotechnologist', 'Business Analyst',
    'Cardiologist', 'Chartered Financial Analyst', 'Chemical Engineer', 'Civil Engineer',
    'Clinical Psychologist', 'Company Secretary', 'Computer Hardware Engineer',
    'Counselling Psychologist', 'Criminal Lawyer', 'Cyber Security Expert',
    'Data Scientist', 'Dentist', 'Digital Artist', 'Drone Pilot', 'Economist',
    'Electrical Engineer', 'Environmental Engineer', 'Fashion Designer',
    'Financial Advisor', 'Food Technologist', 'Forensic Expert', 'Game Developer',
    'Gemologist', 'Geneticist', 'Geologist', 'Graphic Designer', 'IFS Officer',
    'Industrial Designer', 'Interior Designer', 'Investment Banker', 'Judge',
    'Marine Engineer', 'Market Research Analyst', 'Mechanical Engineer',
    'Medical Laboratory Technician', 'Microbiologist', 'Multimedia Artist',
    'Neurologist', 'Neurosurgeon', 'Nuclear Engineer', 'Nutritionist',
    'Occupational Therapist', 'Optometrist', 'Orthodontist', 'Pathologist',
    'Petroleum Engineer', 'Pharmacist', 'Physical Therapist', 'Physicist',
    'Professor', 'Psychiatrist', 'Quantum Computing Engineer', 'Radiologist',
    'Robotics Engineer', 'Software Engineer', 'Space Scientist', 'Special Educator',
    'Statistician', 'UI/UX Designer', 'Veterinarian'
]

# Define profile templates with updated feature names
PROFILES = {
    "technical": {
        'analytical_skill': 95,
        'communication_skill': 70,
        'creativity': 75,
        'detail_orientation': 90,
        'emotional_intelligence': 70,
        'leadership': 75,
        'logical_reasoning': 95,
        'mechanical_aptitude': 85,
        'memory': 85,
        'numerical_ability': 95,
        'physical_stamina': 70,
        'problem_solving': 95,
        'social_skills': 70,
        'spatial_ability': 85,
        'verbal_ability': 80
    },
    "creative": {
        'analytical_skill': 75,
        'communication_skill': 85,
        'creativity': 95,
        'detail_orientation': 85,
        'emotional_intelligence': 80,
        'leadership': 70,
        'logical_reasoning': 80,
        'mechanical_aptitude': 70,
        'memory': 80,
        'numerical_ability': 70,
        'physical_stamina': 70,
        'problem_solving': 85,
        'social_skills': 85,
        'spatial_ability': 90,
        'verbal_ability': 90
    },
    "social": {
        'analytical_skill': 80,
        'communication_skill': 95,
        'creativity': 80,
        'detail_orientation': 85,
        'emotional_intelligence': 95,
        'leadership': 90,
        'logical_reasoning': 85,
        'mechanical_aptitude': 70,
        'memory': 85,
        'numerical_ability': 75,
        'physical_stamina': 75,
        'problem_solving': 85,
        'social_skills': 95,
        'spatial_ability': 75,
        'verbal_ability': 95
    },
    "balanced": {
        'analytical_skill': 85,
        'communication_skill': 85,
        'creativity': 85,
        'detail_orientation': 85,
        'emotional_intelligence': 85,
        'leadership': 85,
        'logical_reasoning': 85,
        'mechanical_aptitude': 85,
        'memory': 85,
        'numerical_ability': 85,
        'physical_stamina': 85,
        'problem_solving': 85,
        'social_skills': 85,
        'spatial_ability': 85,
        'verbal_ability': 85
    }
}

def create_sample_input(profile_type):
    """Create a sample input vector based on the profile type."""
    profile_type = profile_type.upper()
    profile_map = {k.upper(): k for k in PROFILES.keys()}
    
    if profile_type not in profile_map:
        raise ValueError(f"Unknown profile type: {profile_type}")
    
    values = PROFILES[profile_map[profile_type]]
    # Convert to numpy array
    return np.array([list(values.values())])

def load_model():
    """Load the trained model and scaler."""
    try:
        model_path = Path(__file__).parent.parent.parent / 'models' / 'career_model_pipeline.pkl'
        pipeline = joblib.load(model_path)
        print("\nFeature names used during training:")
        if hasattr(pipeline['model'], 'feature_names_in_'):
            print(pipeline['model'].feature_names_in_)
        elif 'feature_names' in pipeline:
            print(pipeline['feature_names'])
        else:
            print("Feature names not found in model")
        return pipeline
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None

def test_model(pipeline, profile_type="balanced"):
    """Test the model with sample input."""
    if pipeline is None:
        return
    
    try:
        print(f"\n=== Career Model Test Results for {profile_type.upper()} Profile ===")
        
        # Get model components
        if all(k in pipeline for k in ['model', 'scaler', 'encoder', 'feature_names']):
            model = pipeline['model']
            scaler = pipeline['scaler']
            encoder = pipeline['encoder']
            feature_names = pipeline['feature_names']
            
            # Create sample input with correct feature order
            sample_input = create_sample_input(profile_type)
            
            print("\nInput Features:")
            print("-" * 50)
            for col in sample_input.columns:
                print(f"{col:20s}: {sample_input[col].values[0]:6.2f}")
            
            print("\nProcessing Steps:")
            print("-" * 50)
            
            # Scale the input
            print("1. Scaling input data...")
            scaled_input = scaler.transform(sample_input)
            print("   ✓ Data scaled successfully")
            
            # Make predictions
            print("2. Generating predictions...")
            probabilities = model.predict_proba(scaled_input)[0]
            print("   ✓ Predictions generated successfully")
            
            # Get top 5 recommendations
            top_5_indices = np.argsort(probabilities)[-5:][::-1]
            top_5_careers = encoder.inverse_transform(top_5_indices)
            top_5_probs = probabilities[top_5_indices]
            
            print("\nTop 5 Career Recommendations:")
            print("-" * 50)
            print(f"{'Rank':4s} {'Career':30s} {'Confidence':10s}")
            print("-" * 50)
            for i, (career, prob) in enumerate(zip(top_5_careers, top_5_probs), 1):
                print(f"{i:3d}. {career:30s} {prob:10.2%}")
            
        else:
            print("\nError: Missing required model components")
            print("Available components:", list(pipeline.keys()))
            
    except Exception as e:
        print(f"\nError during prediction: {str(e)}")
        print("\nDebug Information:")
        print("-" * 50)
        if 'sample_input' in locals():
            print("Input shape:", sample_input.shape)
            print("Input features:", list(sample_input.columns))
        if 'model' in locals():
            print("Expected features:", model.n_features_in_)

def create_skill_variation(base_profile, skill_to_vary, values):
    """Create variations of a profile by changing a specific skill."""
    variations = []
    base_values = PROFILES[base_profile].copy()
    
    for value in values:
        variant = base_values.copy()
        variant[skill_to_vary] = value
        # Update derived skills if needed
        if skill_to_vary in ['logical_reasoning', 'numerical_ability']:
            variant['analytical_skill'] = variant['logical_reasoning'] * variant['numerical_ability'] / 100
        elif skill_to_vary in ['creativity', 'detail_orientation']:
            variant['creative_practical'] = variant['creativity'] * variant['detail_orientation'] / 100
        variations.append(variant)
    
    return variations

def analyze_skill_impact(pipeline, profile_type, skill_to_vary, values):
    """Analyze how varying a skill affects career recommendations."""
    print(f"\n=== Analyzing Impact of {skill_to_vary} on Career Recommendations ===")
    print(f"Base Profile: {profile_type.upper()}")
    print("-" * 70 + "\n")
    
    print(f"Varying {skill_to_vary} from {min(values)} to {max(values)}:")
    print("-" * 70 + "\n")
    
    # Track probability changes
    prob_changes = {}
    
    for value in values:
        # Create a copy of the base profile
        base_profile = PROFILES[profile_type].copy()
        base_profile[skill_to_vary] = value
        
        # Convert to numpy array
        X = np.array([list(base_profile.values())])
        
        # Scale the input
        X_scaled = pipeline['scaler'].transform(X)
        
        # Get predictions
        predictions = pipeline['model'].predict_proba(X_scaled)[0]
        top_3_indices = np.argsort(predictions)[-3:][::-1]
        
        print(f"{skill_to_vary}: {value}")
        print("Top 3 Recommendations:")
        for i, idx in enumerate(top_3_indices, 1):
            career = CAREER_LABELS[idx]
            prob = predictions[idx] * 100
            print(f"  {i}. {career:30} {prob:6.2f}%")
            
            # Track probability changes
            if career not in prob_changes:
                prob_changes[career] = {'min': (prob, value), 'max': (prob, value)}
            else:
                if prob < prob_changes[career]['min'][0]:
                    prob_changes[career]['min'] = (prob, value)
                if prob > prob_changes[career]['max'][0]:
                    prob_changes[career]['max'] = (prob, value)
        
        print("\n")
    
    # Report significant changes
    print("Significant Career Probability Changes:")
    print("-" * 70 + "\n")
    
    for career, changes in prob_changes.items():
        min_prob, min_value = changes['min']
        max_prob, max_value = changes['max']
        prob_change = max_prob - min_prob
        
        if prob_change >= 5.0:  # Only show changes >= 5%
            print(f"{career}:")
            print(f"  Lowest : {min_prob:6.2f}% (at {skill_to_vary}={min_value})")
            print(f"  Highest: {max_prob:6.2f}% (at {skill_to_vary}={max_value})")
            print(f"  Change : {prob_change:6.2f}%\n")

def analyze_with_shap(pipeline, profile_type):
    print(f"\n=== SHAP Analysis for {profile_type} Profile ===")
    print("-" * 70 + "\n")
    
    # Create sample input for the profile
    X = create_sample_input(profile_type)
    
    # Scale the input data
    X_scaled = pipeline['scaler'].transform(X)
    
    # Get predictions
    predictions = pipeline['model'].predict_proba(X_scaled)[0]
    top_3_indices = np.argsort(predictions)[-3:][::-1]
    
    print("Analyzing top 3 career predictions:\n")
    
    try:
        # Calculate SHAP values
        explainer = shap.TreeExplainer(pipeline['model'])
        shap_values = explainer.shap_values(X_scaled)
        
        for idx in top_3_indices:
            career = CAREER_LABELS[idx]
            probability = predictions[idx] * 100
            
            print(f"{career} ({probability:.2f}% confidence)")
            print("-" * 50 + "\n")
            
            # Get SHAP values for this class
            if isinstance(shap_values, list):
                class_shap_values = shap_values[idx][0]
            else:
                class_shap_values = shap_values[0, :, idx]
            
            # Calculate feature importance
            feature_importance = np.abs(class_shap_values)
            feature_indices = np.argsort(feature_importance)[-5:][::-1]
            
            print("Top 5 Contributing Features:")
            for feat_idx in feature_indices:
                feature_name = FEATURE_NAMES[feat_idx]  # Map back to meaningful names
                impact = class_shap_values[feat_idx]
                direction = "increases" if impact > 0 else "decreases"
                print(f"  {feature_name}: {abs(impact):.4f} ({direction} probability)")
            print("\n")
            
    except Exception as e:
        print(f"Error calculating SHAP values: {str(e)}\n")

def main():
    # Load the model
    pipeline = load_model()
    print("Model loaded successfully!")

    # First analyze with SHAP for each profile type
    for profile in ["technical", "creative", "social", "balanced"]:
        analyze_with_shap(pipeline, profile)

    print("\n=== Detailed Skill Impact Analysis ===")
    # Then analyze specific skill impacts
    skills_to_analyze = [
        ("technical", "numerical_ability", [60, 75, 90, 98]),
        ("creative", "creativity", [40, 60, 80, 95]),
        ("social", "social_skills", [50, 70, 85, 95]),
        ("balanced", "logical_reasoning", [60, 75, 85, 95])
    ]
    
    for base_profile, skill, values in skills_to_analyze:
        analyze_skill_impact(pipeline, base_profile, skill, values)

if __name__ == "__main__":
    main()