import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score
from sklearn.ensemble import GradientBoostingRegressor
import joblib

DATA_PATH = Path(__file__).resolve().parents[1] / 'dataset' / 'House_Prediction.csv'
MODELS_DIR = Path(__file__).resolve().parents[1] / 'models'
MODEL_PATH = MODELS_DIR / 'house_price_model.joblib'

MODELS_DIR.mkdir(parents=True, exist_ok=True)

print(f"Loading dataset from: {DATA_PATH}")
df = pd.read_csv(DATA_PATH)
print(f"Raw shape: {df.shape}")

# Basic cleaning and feature extraction to align with frontend/API
# Extract floor number and total floors
floor_num = df['Floor'].str.extract(r'^(\d+|Ground|Upper Basement)', expand=False)
# Map 'Ground'/'Upper Basement' to 0
floor_num = floor_num.replace({'Ground': 0, 'Upper Basement': 0}).astype(float)
total_floors = df['Floor'].str.extract(r'of\s*(\d+)', expand=False).astype(float)

# Build working dataframe
work = pd.DataFrame({
    'area_sqft': df['Size'],
    'bathrooms': df['Bathroom'],
    'floor_num': floor_num.fillna(0),
    'total_floors': total_floors.fillna(total_floors.median()),
    'city': df['City'].astype(str),
    'locality': df['Area Locality'].astype(str).str.lower().str.strip(),
    'furnishing': df['Furnishing Status'].astype(str)
})

# Target
y = pd.to_numeric(df['Rent'], errors='coerce')

# Drop rows with missing target
mask = y.notna()
df = df.loc[mask].reset_index(drop=True)
work = work.loc[mask].reset_index(drop=True)
y = y.loc[mask].reset_index(drop=True)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(work, y, test_size=0.2, random_state=42)

num_cols = ['area_sqft', 'bathrooms', 'floor_num', 'total_floors']
cat_cols = ['city', 'locality', 'furnishing']

pre = ColumnTransformer([
    ('num', StandardScaler(), num_cols),
    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)
])

model = GradientBoostingRegressor(random_state=42)
pipe = Pipeline([
    ('pre', pre),
    ('model', model)
])

print(f"Train size: {X_train.shape}, Test size: {X_test.shape}")
pipe.fit(X_train, y_train)

pred = pipe.predict(X_test)
# Compute RMSE manually for compatibility across sklearn versions
rmse = float(np.sqrt(np.mean((y_test.values - pred) ** 2)))
r2 = r2_score(y_test, pred)
print(f"Validation RMSE: {rmse:.2f}")
print(f"Validation R2: {r2:.4f}")

joblib.dump(pipe, MODEL_PATH)
print(f"Model saved to: {MODEL_PATH}")
