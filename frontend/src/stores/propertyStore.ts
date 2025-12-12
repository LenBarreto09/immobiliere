import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Property } from '../types/Property';
import { apiService } from '../services/api';

interface PropertyState {
  // State
  properties: Property[];
  currentProperty: Property | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchProperties: () => Promise<void>;
  fetchPropertyById: (id: string) => Promise<Property | null>;
  createProperty: (propertyData: Omit<Property, 'id'>) => Promise<Property>;
  updateProperty: (id: string, propertyData: Partial<Property>) => Promise<Property | null>;
  deleteProperty: (id: string) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentProperty: (property: Property | null) => void;
}

export const usePropertyStore = create<PropertyState>()(
  devtools(
    (set, get) => ({
      // Initial state
      properties: [],
      currentProperty: null,
      loading: false,
      error: null,

      // Actions
      fetchProperties: async () => {
        try {
          set({ loading: true, error: null });
          const properties = await apiService.getAllProperties();
          set({ properties, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Échec de récupération des propriétés';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      fetchPropertyById: async (id: string) => {
        try {
          set({ loading: true, error: null });
          const property = await apiService.getPropertyById(id);
          set({ currentProperty: property, loading: false });
          return property;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Échec de récupération de la propriété';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      createProperty: async (propertyData: Omit<Property, 'id'>) => {
        try {
          set({ loading: true, error: null });
          const newProperty = await apiService.createProperty(propertyData);

          // Update the properties list
          const { properties } = get();
          set({
            properties: [...properties, newProperty],
            loading: false
          });

          return newProperty;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Échec de création de la propriété';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      updateProperty: async (id: string, propertyData: Partial<Property>) => {
        try {
          set({ loading: true, error: null });
          const updatedProperty = await apiService.updateProperty(id, propertyData);

          if (updatedProperty) {
            // Update the properties list
            const { properties } = get();
            const updatedProperties = properties.map(prop =>
              prop.id === id ? updatedProperty : prop
            );
            set({
              properties: updatedProperties,
              currentProperty: updatedProperty,
              loading: false
            });
          }

          return updatedProperty;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Échec de mise à jour de la propriété';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      deleteProperty: async (id: string) => {
        try {
          set({ loading: true, error: null });
          const success = await apiService.deleteProperty(id);

          if (success) {
            // Remove from the properties list
            const { properties } = get();
            const filteredProperties = properties.filter(prop => prop.id !== id);
            set({
              properties: filteredProperties,
              currentProperty: null,
              loading: false
            });
          }

          return success;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Échec de suppression de la propriété';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      setCurrentProperty: (property: Property | null) => set({ currentProperty: property }),
    }),
    {
      name: 'property-store',
    }
  )
);

