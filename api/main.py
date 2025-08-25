from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
from pathlib import Path
import logging
from typing import List, Optional
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="House Price Prediction API",
    description="API for predicting house prices using machine learning",
    version="1.0.0"
)

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model (file-relative, independent of CWD)
MODEL_PATH = (Path(__file__).resolve().parents[1] / "models" / "house_price_model.joblib")

class HouseFeatures(BaseModel):
    """Input features for house price prediction."""
    area_sqft: float = Field(..., gt=0, description="Area in square feet")
    bathrooms: float = Field(..., gt=0, description="Number of bathrooms")
    floor: float = Field(..., ge=0, description="Current floor number")
    total_floors: float = Field(..., ge=1, description="Total floors in the building")
    city: str = Field(..., min_length=2, description="City name")
    locality: str = Field(..., min_length=1, description="Locality/neighborhood")
    furnishing: str = Field(..., min_length=2, description="Furnishing status")
    # Optional fields accepted from the frontend but not used by the current model
    age_years: Optional[float] = Field(0, ge=0, description="Age of the property in years")
    property_type: Optional[str] = Field(None, description="Type of property")
    amenities_count: Optional[int] = Field(0, ge=0, description="Number of amenities")
    parking_spots: Optional[int] = Field(0, ge=0, description="Number of parking spots")

class PredictionResponse(BaseModel):
    """Response model for price prediction."""
    predicted_price: float = Field(..., description="Predicted price in INR")
    confidence_interval: dict = Field(
        ...,
        description="Confidence interval for the prediction"
    )

class BatchPredictionResponse(BaseModel):
    """Response model for batch predictions."""
    predictions: List[float]

# Load model at startup
@app.on_event("startup")
async def load_model():
    try:
        if not MODEL_PATH.exists():
            raise FileNotFoundError("Model file not found. Please train the model first.")
        
        global model
        model = joblib.load(MODEL_PATH)
        logger.info("Model loaded successfully")
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        raise

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "House Price Prediction API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict(house: HouseFeatures):
    """
    Predict house price based on input features.
    
    This endpoint takes house features and returns a predicted price
    along with a confidence interval.
    """
    try:
        # Convert input to DataFrame for the model (align with training features)
        input_data = {
            'area_sqft': [house.area_sqft],
            'bathrooms': [house.bathrooms],
            'floor_num': [house.floor],
            'total_floors': [house.total_floors],
            'city': [house.city],
            'locality': [house.locality.lower().strip()],
            'furnishing': [house.furnishing]
        }
        X = pd.DataFrame(input_data)

        # Make prediction directly (no log transform)
        prediction = float(model.predict(X)[0])

        # Simple confidence interval (±15%)
        lower_bound = prediction * 0.85
        upper_bound = prediction * 1.15
        
        return {
            "predicted_price": round(prediction, 2),
            "confidence_interval": {
                "lower_bound": round(lower_bound, 2),
                "upper_bound": round(upper_bound, 2)
            }
        }
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/batch", response_model=BatchPredictionResponse)
async def predict_batch(houses: List[HouseFeatures]):
    """
    Predict house prices for multiple properties in a single request.
    
    This endpoint takes a list of house features and returns predicted prices.
    """
    try:
        if not houses:
            raise HTTPException(status_code=400, detail="No input data provided")
            
        # Convert input to DataFrame
        rows = []
        for h in houses:
            rows.append({
                'area_sqft': h.area_sqft,
                'bathrooms': h.bathrooms,
                'floor_num': h.floor,
                'total_floors': h.total_floors,
                'city': h.city,
                'locality': h.locality.lower().strip(),
                'furnishing': h.furnishing,
            })
        df = pd.DataFrame(rows)

        # Make predictions directly
        predictions = model.predict(df).tolist()
        
        return {"predictions": [round(p, 2) for p in predictions]}
        
    except Exception as e:
        logger.error(f"Batch prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

# Model info endpoint
@app.get("/model-info")
async def model_info():
    """Get information about the loaded model."""
    if not MODEL_PATH.exists():
        raise HTTPException(status_code=404, detail="Model not found")
        
    model_info = {
        "model_type": str(type(model).__name__),
        "model_path": str(MODEL_PATH),
        "model_size_mb": MODEL_PATH.stat().st_size / (1024 * 1024)
    }
    
    # Add model parameters if available
    if hasattr(model, 'get_params'):
        model_info["parameters"] = model.get_params()
    
    return model_info
