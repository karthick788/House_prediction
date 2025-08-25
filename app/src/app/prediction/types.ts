          export type City = 'Bengaluru' | 'Mumbai' | 'Delhi' | 'Chennai' | 'Hyderabad' | 'Pune' | 'Kolkata';
export type PropertyType = 'Apartment' | 'Villa' | 'Penthouse' | 'Studio' | 'Duplex';
export type Furnishing = 'Fully-Furnished' | 'Semi-Furnished' | 'Unfurnished';

export interface PredictionResponse {
  predicted_price: number;
  confidence_interval?: {
    lower_bound: number;
    upper_bound: number;
  };
}

export interface PredictionFormData {
  area_sqft: number;
  bathrooms: number;
  age_years: number;
  city: City;
  locality: string;
  property_type: PropertyType;
  furnishing: Furnishing;
  amenities_count: number;
  parking_spots: number;
  floor: number;
  total_floors: number;
}

export const CITIES: City[] = [
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kolkata'
];

export const PROPERTY_TYPES: PropertyType[] = [
  'Apartment',
  'Villa',
  'Penthouse',
  'Studio',
  'Duplex'
];

export const FURNISHING_OPTIONS: Furnishing[] = [
  'Fully-Furnished',
  'Semi-Furnished',
  'Unfurnished'
];
