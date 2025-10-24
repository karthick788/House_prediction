import React from 'react';
import { PredictionResponse } from '../types';

interface PredictionResultProps {
  prediction: PredictionResponse;
  onReset: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  prediction,
  onReset,
}) => {
  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString('en-IN')}`;

  return (
    <div className="mt-8 bg-white rounded-lg shadow overflow-hidden border border-gray-200 animate-fadeIn">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Prediction Result</h3>
        <p className="text-sm text-gray-500">Based on the provided property details</p>
      </div>
      
      {/* Body */}
      <div className="p-6">
        {/* Predicted Price */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600">
            {formatCurrency(prediction.predicted_price)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Estimated Market Value</p>
        </div>

        {/* Confidence Interval */}
        {prediction.confidence_interval ? (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Confidence Range</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">Lower Bound</div>
                <div className="text-lg font-semibold text-blue-700">
                  {formatCurrency(prediction.confidence_interval.lower_bound)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">Upper Bound</div>
                <div className="text-lg font-semibold text-blue-700">
                  {formatCurrency(prediction.confidence_interval.upper_bound)}
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              There's a 90% chance the actual price falls within this range.
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-400 mb-6">
            Confidence range not available.
          </p>
        )}

        {/* Reset Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onReset}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                       transition-colors"
          >
            Make Another Prediction
          </button>
        </div>
      </div>
    </div>
  );
};
