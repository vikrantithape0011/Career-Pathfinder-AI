from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for the frontend origin
CORS(app, origins=["http://localhost:5173"])

# Define the path to the model pipeline file
# Assuming the model file is in the same directory as this app.py
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'Career_model_pipeline.pkl')

# Load the model pipeline when the app starts
pipeline = None
try:
    pipeline = joblib.load(MODEL_PATH)
    print("Successfully loaded model pipeline.")
except FileNotFoundError:
    print(f"Error: Model file not found at {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    print("Ensure you have the correct versions of joblib, scikit-learn, and lightgbm installed.")

# Define the expected features for the model input based on the notebook analysis
# These are the direct scores used, excluding the engineered features initially
DIRECT_SCORE_FEATURES = [
    'cognition', 'reasoning', 'figural_memory', 'spatial_ability',
    'verbal_ability', 'social_ability', 'numerical_ability', 'numerical_memory',
    'knowledge', 'practical', 'artistic', 'social', 'power_coping'
]

# The full list of features including engineered ones, in the order expected by the model
# This order is important for consistency if your scaler or model are sensitive to it
# Based on the provided list, assuming this is the correct order
EXPECTED_FEATURES_ORDER = [
    'cognition', 'reasoning', 'figural_memory', 'spatial_ability',
    'verbal_ability', 'social_ability', 'numerical_ability', 'numerical_memory',
    'knowledge', 'practical', 'artistic', 'social', 'power_coping',
    'analytical_skill', 'creative_practical'
]


@app.route('/predict', methods=['POST'])
def predict():
    if pipeline is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        # Get the scores from the request
        data = request.get_json(force=True)
        scores = data.get('scores')

        if not scores:
            return jsonify({"error": "No scores provided"}), 400

        # --- Data Preprocessing to match training data format ---
        # Create a dictionary with the expected direct score features
        # Use .get() with a default of 0 in case a score is missing
        feature_data = {feature: scores.get(feature, 0) for feature in DIRECT_SCORE_FEATURES}

        # Convert to DataFrame
        # Initially create with direct scores, then add engineered features
        input_df = pd.DataFrame([feature_data])

        # Recreate engineered features - must match notebook logic exactly
        # Ensure the keys used here match the keys retrieved from `scores` above
        # These columns should exist in input_df now
        input_df['analytical_skill'] = input_df['reasoning'] * input_df['numerical_ability']
        input_df['creative_practical'] = input_df['artistic'] * input_df['practical']

        # Reorder columns to match the order the model was trained on
        # This is crucial for ensuring correct input to the scaler and model
        input_df = input_df[EXPECTED_FEATURES_ORDER]

        # --- End Preprocessing ---

        # Scale the input features using the loaded scaler
        scaler = pipeline['scaler']
        input_scaled = scaler.transform(input_df)

        # Make predictions using the loaded model
        model = pipeline['model']
        # Get probabilities to find top N careers
        probabilities = model.predict_proba(input_scaled)

        # Get top N predictions (e.g., top 5)
        top_n = 5 # Or any number you want
        # Get the indices of the top N probabilities
        top_n_indices = np.argsort(probabilities[0])[-top_n:][::-1]

        # Decode the predicted labels using the loaded encoder
        encoder = pipeline['encoder']
        predicted_careers = encoder.inverse_transform(top_n_indices)

        # Convert predictions to a list
        predicted_careers_list = predicted_careers.tolist()

        return jsonify({"predicted_careers": predicted_careers_list})

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": "Error during prediction", "details": str(e)}), 500

if __name__ == '__main__':
    # To run the Flask app, navigate to the directory containing app.py in your terminal
    # and run: python app.py
    # For development, you can run with debug=True
    # For production, use a production-ready WSGI server like Gunicorn or uWSGI
    app.run(debug=True, port=5001) # You can choose any available port 