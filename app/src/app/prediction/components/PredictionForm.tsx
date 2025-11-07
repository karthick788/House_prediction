import React, { useState } from "react";
import "../../globals.css";
import { FormInput } from "./FormInput";
import { SelectInput } from "./SelectInput";
import {
  PredictionResponse,
  PredictionFormData,
  CITIES,
  PROPERTY_TYPES,
  FURNISHING_OPTIONS,
  CITY_LOCALITIES,
  City,
} from "../types";

interface PredictionFormProps {
  onSubmit: (formData: PredictionFormData) => Promise<PredictionResponse>;
  loading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState<PredictionFormData>({
    area_sqft: 1000,
    bathrooms: 2,
    age_years: 5,
    city: "Bengaluru",
    locality: "",
    property_type: "Apartment",
    furnishing: "Semi-Furnished",
    amenities_count: 2,
    parking_spots: 1,
    floor: 1,
    total_floors: 10,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // If city is changed, reset locality
    if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        city: value as City,
        locality: "", // Reset locality when city changes
      }));
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.endsWith("_sqft") ||
        name.endsWith("_count") ||
        name.endsWith("_spots") ||
        name === "floor" ||
        name === "total_floors" ||
        name === "bathrooms" ||
        name === "age_years"
          ? Number(value)
          : value,
    }));
  };

  // Get localities for the selected city
  const availableLocalities = CITY_LOCALITIES[formData.city] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Area (sq. ft.)"
          name="area_sqft"
          type="number"
          value={formData.area_sqft}
          onChange={handleChange}
          min={100}
          placeholder="Enter property area (e.g., 1200)"
          required
        />

        <FormInput
          label="Bathrooms"
          name="bathrooms"
          type="number"
          value={formData.bathrooms}
          onChange={handleChange}
          min={1}
          step={0.5}
          placeholder="Number of bathrooms (e.g., 2)"
          required
        />

        <FormInput
          label="Property Age (years)"
          name="age_years"
          type="number"
          value={formData.age_years}
          onChange={handleChange}
          min={0}
          placeholder="How old is the property?"
          required
        />

        <SelectInput
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          options={CITIES.map((city) => ({ value: city, label: city }))}
          placeholder="Select a city"
          required
        />

        <SelectInput
          label="Locality"
          name="locality"
          value={formData.locality}
          onChange={handleChange}
          options={availableLocalities.map((locality) => ({
            value: locality,
            label: locality,
          }))}
          placeholder={`Select locality in ${formData.city}`}
          required
        />

        <SelectInput
          label="Property Type"
          name="property_type"
          value={formData.property_type}
          onChange={handleChange}
          options={PROPERTY_TYPES.map((type) => ({ value: type, label: type }))}
          placeholder="Select property type"
          required
        />

        <SelectInput
          label="Furnishing"
          name="furnishing"
          value={formData.furnishing}
          onChange={handleChange}
          options={FURNISHING_OPTIONS.map((option) => ({
            value: option,
            label: option.replace("-", " "),
          }))}
          placeholder="Select furnishing status"
          required
        />

        <FormInput
          label="Number of Amenities"
          name="amenities_count"
          type="number"
          value={formData.amenities_count}
          onChange={handleChange}
          min={0}
          max={20}
          placeholder="Enter number of amenities (0–20)"
          required
        />

        <FormInput
          label="Parking Spots"
          name="parking_spots"
          type="number"
          value={formData.parking_spots}
          onChange={handleChange}
          min={0}
          max={5}
          placeholder="Enter parking spots (e.g., 1)"
          required
        />

        <FormInput
          label="Floor"
          name="floor"
          type="number"
          value={formData.floor}
          onChange={handleChange}
          min={0}
          max={formData.total_floors}
          placeholder="Which floor is the property on?"
          required
        />

        <FormInput
          label="Total Floors in Building"
          name="total_floors"
          type="number"
          value={formData.total_floors}
          onChange={handleChange}
          min={1}
          placeholder="Total floors in building"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-blue-500 
                   disabled:opacity-50 transition-colors text-lg font-medium"
      >
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </form>
  );
};
