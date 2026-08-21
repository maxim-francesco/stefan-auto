// src/config/api.ts

const API_HOST = import.meta.env.VITE_API_URL || "https://saas-platform-backend-1.onrender.com";
export const BASE_URL = API_HOST.endsWith("/api") ? API_HOST : `${API_HOST}/api`;
export const BUSINESS_ID = "cmk42dgx00ce8lj2871bq7mcy";
export const EUR_TO_RON = 5.08; // Curs de schimb valutar (1 EUR = 5,08 LEI)
export const EUR_TO_RON_LABEL = "1 EUR = 5,08 RON";

