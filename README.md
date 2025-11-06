# 🏠 House Price Prediction System

A production-ready machine learning system for predicting house prices with a modern web interface. Built with FastAPI backend and Next.js frontend, deployed on Render and Vercel.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://house-prediction-g35r.vercel.app/)
[![API](https://img.shields.io/badge/API-FastAPI-009688)](https://house-prediction-v2kd.onrender.com)

## ✨ Features

- 🏠 **Accurate Price Prediction**: Using ensemble models (LightGBM/XGBoost)
- 📊 **Model Explainability**: SHAP values for prediction interpretation
- 🌐 **RESTful API**: FastAPI backend with automatic documentation
- 🖥️ **Modern Frontend**: Next.js 15 with React 19 and TailwindCSS
- 📦 **Batch Processing**: Predict multiple properties at once
- 🔒 **CORS Enabled**: Secure cross-origin resource sharing
- 🐳 **Docker Support**: Containerized deployment
- 📱 **Responsive Design**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.9+)
- **Machine Learning**: Scikit-learn, XGBoost, LightGBM
- **Model Interpretation**: SHAP
- **Data Processing**: Pandas, NumPy
- **API Documentation**: Swagger UI (built into FastAPI)
- **Deployment**: Render

### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel

## 📁 Project Structure

```
House_prediction/
├── api/                  # Backend API code
│   └── main.py           # FastAPI application
├── app/                  # Frontend Next.js application
│   ├── src/              # Source code
│   │   ├── app/          # Next.js app directory
│   │   └── components/   # React components
│   ├── public/           # Static files
│   ├── package.json      # Frontend dependencies
│   └── next.config.js    # Next.js configuration
├── data/                 # Data files
│   ├── raw/              # Raw data files
│   └── processed/        # Processed data files
├── notebooks/            # Jupyter notebooks for EDA
├── training/             # Model training scripts
├── models/               # Trained ML models
├── tests/                # Test files
├── requirements.txt      # Python dependencies
├── Dockerfile            # Docker configuration
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn
- Docker (optional)

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/karthick788/House_prediction.git
   cd House_prediction
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server**:
   ```bash
   cd api
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   
   The API will be available at [http://localhost:8000](http://localhost:8000)

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd app
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file** (optional for local development):
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Setup (Alternative)

1. **Build and run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

2. **Access the application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🌐 API Endpoints

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information and welcome message |
| POST | `/predict` | Predict house price for a single property |
| POST | `/predict/batch` | Predict prices for multiple properties |
| GET | `/health` | Health check endpoint |
| GET | `/model/info` | Get loaded model information |

### Request Example

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "area_sqft": 1500,
    "bathrooms": 2,
    "floor": 3,
    "total_floors": 10,
    "city": "Mumbai",
    "locality": "Andheri",
    "furnishing": "Semi-Furnished",
    "age_years": 5,
    "property_type": "Apartment",
    "amenities_count": 5,
    "parking_spots": 1
  }'
```

### Interactive API Documentation

Once the API is running, visit:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 🚀 Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repository
4. Configure the service:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3.9
5. Deploy and get your backend URL

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL
5. Deploy

## 📊 Model Information

The prediction system uses ensemble machine learning models:
- **LightGBM**: Gradient boosting framework
- **XGBoost**: Extreme gradient boosting
- **Scikit-learn**: For preprocessing and feature engineering

Features used for prediction:
- Area (square feet)
- Number of bathrooms
- Floor number and total floors
- City and locality
- Furnishing status
- Property age
- Property type
- Amenities count
- Parking spots

## 🧪 Testing

Run tests with:
```bash
pytest tests/
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework for building APIs
- [Next.js](https://nextjs.org/) - React framework for production
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Scikit-learn](https://scikit-learn.org/) - Machine learning library
- [XGBoost](https://xgboost.readthedocs.io/) - Gradient boosting library
- [LightGBM](https://lightgbm.readthedocs.io/) - Gradient boosting framework
- [SHAP](https://shap.readthedocs.io/) - Model interpretation library
- [Render](https://render.com/) - Cloud platform for backend
- [Vercel](https://vercel.com/) - Platform for frontend deployment

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by [Karthick](https://github.com/karthick788)
