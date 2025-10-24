'use client';

import { useState } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { PredictionResponse, PredictionFormData } from './types';
import { ApiService } from '../services/api';

export default function PredictionPage() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: PredictionFormData): Promise<PredictionResponse> => {
    try {
      setLoading(true);
      setError(null);
      const result = await ApiService.predictHousePrice(formData);
      setPrediction(result);
      return result;
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to get prediction. Please try again.');
      throw err as Error;
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">House Price Prediction</h1>
          <p className="text-gray-600">
            Enter your property details to get an estimated market value
          </p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Property Details</h2>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {prediction ? (
              <PredictionResult 
                prediction={prediction} 
                onReset={handleReset} 
              />
            ) : (
              <PredictionForm 
                onSubmit={handleSubmit} 
                loading={loading} 
              />
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            This is an estimate based on current market trends and should not be considered as financial advice.
            For a detailed property valuation, please contact our real estate experts.
          </p>
        </div>
      </div>
    </div>
  );
}
