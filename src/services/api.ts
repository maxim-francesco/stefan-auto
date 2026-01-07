// src/services/api.ts
import { BASE_URL, BUSINESS_ID } from "@/config/api";

// Define a type for the car attribute values for better type safety
interface AttributeValue {
  stringValue: string | null;
  numberValue: number | null;
  booleanValue: boolean | null;
  attribute: {
    name: string;
    type: string;
  };
}

// Define the structure for a single car listing from the API
export interface ApiCar {
  id: string;
  title: string;
  description: string;
  price: number | null;
  status: "AVAILABLE" | "SOLD";
  images: { url: string }[];
  attributeValues: AttributeValue[];
}

// Define the structure for the API response, including pagination
interface ApiResponse {
  data: ApiCar[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface FetchListingsParams {
  limit?: number;
  page?: number;
  [key: string]: any; // Allow other dynamic filter params
}

/**
 * Fetches public car listings from the backend API.
 * @returns A promise that resolves to the API response.
 */
export const fetchPublicListings = async (params: FetchListingsParams = {}): Promise<ApiResponse> => {
  const query = new URLSearchParams({
    businessId: BUSINESS_ID,
    ...params,
  });
  
  const url = `${BASE_URL}/public/listings/search?${query.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // If the server response is not OK, throw an error with the status
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    // Re-throw the error to be handled by react-query
    throw error;
  }
};
