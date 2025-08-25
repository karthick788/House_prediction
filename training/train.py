import os
import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import OneHotEncoder, StandardScaler, FunctionTransformer
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from lightgbm import LGBMRegressor
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Constants
RANDOM_STATE = 42
DATA_PATH = Path('data/raw/sample_housing_data.csv')
MODEL_DIR = Path('models')
MODEL_DIR.mkdir(exist_ok=True)

def load_data(filepath: Path) -> pd.DataFrame:
    """Load and preprocess the housing data."""
    logger.info(f"Loading data from {filepath}")
    df = pd.read_csv(filepath)
    
    # Basic validation
    required_columns = ['area_sqft', 'bathrooms', 'age_years', 'lat', 'lon', 
                       'amenities_count', 'city', 'locality', 'property_type', 
                       'furnishing', 'price']
    
    missing_cols = [col for col in required_columns if col not in df.columns]
    if missing_cols:
        raise ValueError(f"Missing required columns: {missing_cols}")
    
    return df

def create_preprocessor(numerical_features, categorical_features):
    """Create a preprocessor for numerical and categorical features."""
    numerical_transformer = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    
    categorical_transformer = Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_transformer, numerical_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    return preprocessor

def train_model(X, y):
    """Train and tune the LightGBM model."""
    # Define features
    numerical_features = ['area_sqft', 'bathrooms', 'age_years', 'lat', 'lon', 'amenities_count']
    categorical_features = ['city', 'locality', 'property_type', 'furnishing']
    
    # Create preprocessing pipeline
    preprocessor = create_preprocessor(numerical_features, categorical_features)
    
    # Define model
    model = LGBMRegressor(
        random_state=RANDOM_STATE,
        n_estimators=1000,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        n_jobs=-1
    )
    
    # Create pipeline
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', model)
    ])
    
    # Hyperparameter grid
    param_grid = {
        'model__num_leaves': [31, 63],
        'model__min_child_samples': [10, 20],
        'model__reg_alpha': [0, 0.1],
        'model__reg_lambda': [0, 0.1]
    }
    
    # Train model with cross-validation
    logger.info("Starting model training with cross-validation")
    grid_search = GridSearchCV(
        pipeline,
        param_grid,
        cv=5,
        scoring='neg_mean_absolute_error',
        n_jobs=-1,
        verbose=1
    )
    
    grid_search.fit(X, y)
    
    logger.info(f"Best parameters: {grid_search.best_params_}")
    logger.info(f"Best CV score (MAE): {-grid_search.best_score_:.2f}")
    
    return grid_search.best_estimator_

def evaluate_model(model, X_test, y_test):
    """Evaluate the model on test data."""
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Calculate metrics
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    
    logger.info(f"Test MAE: {mae:,.2f}")
    logger.info(f"Test RMSE: {rmse:,.2f}")
    logger.info(f"Test R²: {r2:.4f}")
    
    return {
        'mae': mae,
        'rmse': rmse,
        'r2': r2
    }

def save_model(model, filename):
    """Save the trained model to disk."""
    joblib.dump(model, filename)
    logger.info(f"Model saved to {filename}")

def main():
    try:
        # Load and prepare data
        df = load_data(DATA_PATH)
        
        # Define features and target
        X = df.drop('price', axis=1)
        y = np.log1p(df['price'])  # Log-transform target
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=RANDOM_STATE, stratify=df['city']
        )
        
        # Train model
        model = train_model(X_train, y_train)
        
        # Evaluate model
        metrics = evaluate_model(model, X_test, y_test)
        
        # Save model
        model_path = MODEL_DIR / 'house_price_model.joblib'
        save_model(model, model_path)
        
        logger.info("Training completed successfully!")
        
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}", exc_info=True)
        raise

if __name__ == "__main__":
    main()
