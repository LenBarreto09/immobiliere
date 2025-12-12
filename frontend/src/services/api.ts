import type { Property } from '../types/Property';
import { mockProperties } from '../data/mockData';

// API base URL - adjust for your backend server
const API_BASE_URL = 'http://localhost:8000';

export interface ApiResponse<T> {
  items?: T[];
  total?: number;
  error?: string;
}

export const apiService = {
  // Get all properties
  async getAllProperties(): Promise<Property[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Property> = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to mock data for development
      console.warn('API unavailable, falling back to mock data');
      return mockProperties;
    }
  },

  // Get property by ID
  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching property:', error);
      // Fallback to mock data for development
      console.warn('API unavailable, falling back to mock data');
      return mockProperties.find(property => property.id === id) || null;
    }
  },

  // Create new property
  async createProperty(propertyData: Omit<Property, 'id'>): Promise<Property> {
    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating property:', error);
      // Fallback - simulate creation for development
      console.warn('API unavailable, simulating property creation');
      const newProperty: Property = {
        ...propertyData,
        id: Date.now().toString(),
      };
      return newProperty;
    }
  },

  // Update property
  async updateProperty(id: string, propertyData: Partial<Property>): Promise<Property | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating property:', error);
      // Fallback - simulate update for development
      console.warn('API unavailable, simulating property update');
      const existingProperty = mockProperties.find(p => p.id === id);
      if (existingProperty) {
        return { ...existingProperty, ...propertyData };
      }
      return null;
    }
  },

  // Delete property
  async deleteProperty(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      // Fallback - simulate deletion for development
      console.warn('API unavailable, simulating property deletion');
      return true;
    }
  },
};
