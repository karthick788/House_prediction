import { PredictionFormData, PredictionResponse } from '../prediction/types';

// Environment-based API URL
const API_URL = 'http://localhost:8000'; // Directly set the backend URL

export const ApiService = {
  /**
   * Predict house price using the backend API
   */
  predictHousePrice: async (formData: PredictionFormData): Promise<PredictionResponse> => {
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get prediction');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  /**
   * Check API health
   */
  checkHealth: async (): Promise<{status: string}> => {
    try {
      const response = await fetch(`${API_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};