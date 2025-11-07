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

// City-wise locality mapping
export const CITY_LOCALITIES: Record<City, string[]> = {
  'Bengaluru': [
    'Whitefield',
    'Electronic City',
    'Koramangala',
    'Indiranagar',
    'HSR Layout',
    'Marathahalli',
    'Jayanagar',
    'BTM Layout',
    'Yelahanka',
    'Hebbal',
    'Banashankari',
    'JP Nagar',
    'Rajajinagar',
    'Malleshwaram',
    'Bellandur'
  ],
  'Mumbai': [
    'Andheri',
    'Bandra',
    'Powai',
    'Goregaon',
    'Malad',
    'Borivali',
    'Kandivali',
    'Thane',
    'Navi Mumbai',
    'Worli',
    'Lower Parel',
    'Dadar',
    'Kurla',
    'Chembur',
    'Juhu'
  ],
  'Delhi': [
    'Dwarka',
    'Rohini',
    'Pitampura',
    'Janakpuri',
    'Saket',
    'Vasant Kunj',
    'Greater Kailash',
    'Lajpat Nagar',
    'Nehru Place',
    'Connaught Place',
    'Karol Bagh',
    'Rajouri Garden',
    'Mayur Vihar',
    'Preet Vihar',
    'Punjabi Bagh'
  ],
  'Chennai': [
    'Anna Nagar',
    'T Nagar',
    'Velachery',
    'Adyar',
    'Tambaram',
    'Porur',
    'OMR',
    'Chromepet',
    'Mylapore',
    'Nungambakkam',
    'Guindy',
    'Perungudi',
    'Sholinganallur',
    'Thiruvanmiyur',
    'Besant Nagar'
  ],
  'Hyderabad': [
    'Gachibowli',
    'Madhapur',
    'Hitech City',
    'Kondapur',
    'Banjara Hills',
    'Jubilee Hills',
    'Kukatpally',
    'Miyapur',
    'Secunderabad',
    'Ameerpet',
    'Begumpet',
    'Manikonda',
    'Kompally',
    'Uppal',
    'LB Nagar'
  ],
  'Pune': [
    'Hinjewadi',
    'Wakad',
    'Baner',
    'Aundh',
    'Kothrud',
    'Viman Nagar',
    'Koregaon Park',
    'Hadapsar',
    'Magarpatta',
    'Pimpri Chinchwad',
    'Kharadi',
    'Wagholi',
    'Shivajinagar',
    'Deccan',
    'Kalyani Nagar'
  ],
  'Kolkata': [
    'Salt Lake',
    'New Town',
    'Rajarhat',
    'Ballygunge',
    'Park Street',
    'Alipore',
    'Behala',
    'Howrah',
    'Dum Dum',
    'Jadavpur',
    'Tollygunge',
    'Garia',
    'Barasat',
    'Kasba',
    'Lake Gardens'
  ]
};
