import joblib
import os
import sklearn
import lightgbm
import requests
import json

model_path = "Career_model_pipeline.pkl"

try:
    # Use joblib.load() to load the model saved with joblib.dump()
    pipeline = joblib.load(model_path)
    print(f"Successfully loaded model pipeline from {model_path}")

    # You can now access the components like this:
    model = pipeline['model']
    scaler = pipeline['scaler']
    encoder = pipeline['encoder']

    print("Model, scaler, and encoder extracted from the pipeline.")
    # You can add code here to use the loaded model for predictions

    print(f"scikit-learn version: {sklearn.__version__}")
    print(f"joblib version: {joblib.__version__}")
    print(f"lightgbm version: {lightgbm.__version__}")

except FileNotFoundError:
    print(f"Error: Model file not found at {model_path}")
except Exception as e:
    print(f"Error loading model: {e}")
    print("Ensure you have the correct versions of joblib, scikit-learn, and lightgbm installed.")
    print("Also, double-check the file path and ensure the file is not corrupted.")

# Define the URL of the Flask predict endpoint
url = 'http://127.0.0.1:5001/predict' # Assuming the Flask app is running on port 5001

# Sample test scores. Replace with actual scores you want to test.
# The keys should match the DIRECT_SCORE_FEATURES list in app.py
sample_scores = {
    "cognition": 80,
    "reasoning": 70,
    "figural_memory": 60,
    "spatial_ability": 50,
    "verbal_ability": 70,
    "social_ability": 80,
    "numerical_ability": 60,
    "numerical_memory": 50,
    "knowledge": 90,
    "practical": 70,
    "artistic": 40,
    "social": 80,
    "power_coping": 60
}

# Send the POST request
try:
    response = requests.post(url, json={'scores': sample_scores})
    response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)

    # Parse the JSON response
    result = response.json()

    print("Prediction successful!")
    print("Input Scores:", sample_scores)
    print("Predicted Careers:", result.get("predicted_careers"))

except requests.exceptions.RequestException as e:
    print(f"Error sending request: {e}")
    print("Please ensure the Flask app (app.py) is running and accessible at", url)
except json.JSONDecodeError:
    print("Error decoding JSON response. Received:", response.text)
except Exception as e:
    print(f"An unexpected error occurred: {e}")
