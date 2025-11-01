import numpy as np
import joblib
import os
from typing import List, Dict

class ModelService:
    def __init__(self):
        # Load the model from the saved file
        model_path = os.path.join(os.path.dirname(__file__), '../../models/career_model_pipeline.pkl')
        self.model = joblib.load(model_path)
        
        # Define the career categories
        self.career_categories = [
            'Software Engineer', 'Data Scientist', 'Product Manager',
            'Business Analyst', 'UX Designer', 'Project Manager',
            'Marketing Manager', 'Financial Analyst', 'HR Manager',
            'Sales Representative'
        ]

    def predict_careers(self, scores: Dict[str, float]) -> List[str]:
        """
        Predict career recommendations based on test scores.
        
        Args:
            scores: Dictionary containing ability and orientation scores
            
        Returns:
            List of recommended careers
        """
        # Extract scores in the correct order
        input_vector = np.array([
            scores['cognition'],
            scores['reasoning'],
            scores['figuralMemory'],
            scores['spatialAbility'],
            scores['verbalAbility'],
            scores['numericalAbility'],
            scores['numericalMemory'],
            scores['socialAbility'],
            scores['knowledge'],
            scores['practical'],
            scores['artistic'],
            scores['social'],
            scores['powerCopingStyle']
        ]).reshape(1, -1)

        # Get model predictions
        predictions = self.model.predict_proba(input_vector)[0]
        
        # Get top 3 career recommendations
        top_indices = np.argsort(predictions)[-3:][::-1]
        recommendations = [self.career_categories[i] for i in top_indices]
        
        return recommendations