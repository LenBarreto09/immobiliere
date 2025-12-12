// Mock data for development/demo purposes
// TODO: Replace with actual API data

import type { Property } from '../types/Property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in City Center',
    city: 'Paris',
    price: 850000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/4f46e5/white?text=Property+Image',
    description: 'Beautiful modern apartment located in the heart of Paris. This stunning property features high-end finishes, floor-to-ceiling windows with city views, and premium appliances throughout.',
    bedrooms: 2,
    bathrooms: 2,
    size: 85,
    type: 'Apartment',
  },
  {
    id: '2',
    title: 'Luxury Villa with Garden',
    city: 'Nice',
    price: 1200000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/059669/white?text=Villa+Image',
    description: 'Stunning luxury villa with beautiful garden and pool area. Perfect for families seeking luxury living in the French Riviera.',
    bedrooms: 4,
    bathrooms: 3,
    size: 220,
    type: 'Villa',
  },
  {
    id: '3',
    title: 'Cozy Studio Near Metro',
    city: 'Lyon',
    price: 320000,
    currency: '€',
    description: 'Perfect starter home or investment property. Located just minutes from metro station with easy access to city center.',
    bedrooms: 1,
    bathrooms: 1,
    size: 35,
    type: 'Studio',
  },
  {
    id: '4',
    title: 'Penthouse with Terrace',
    city: 'Cannes',
    price: 2500000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/6366f1/white?text=Penthouse',
    description: 'Exclusive penthouse with panoramic views and private terrace. Ultimate luxury living on the French Riviera.',
    bedrooms: 3,
    bathrooms: 3,
    size: 150,
    type: 'Penthouse',
  },
  {
    id: '5',
    title: 'Family House with Garden',
    city: 'Bordeaux',
    price: 680000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/059669/white?text=House+Image',
    description: 'Spacious family home with large garden. Perfect for families with children, quiet neighborhood with good schools nearby.',
    bedrooms: 4,
    bathrooms: 2,
    size: 180,
    type: 'House',
  },
  {
    id: '6',
    title: 'Modern Townhouse',
    city: 'Toulouse',
    price: 450000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/4f46e5/white?text=Townhouse',
    description: 'Contemporary townhouse with modern amenities and small private garden. Great location near public transport.',
    bedrooms: 3,
    bathrooms: 2,
    size: 125,
    type: 'Townhouse',
  },
  {
    id: '7',
    title: 'Elegant Mansion with Pool',
    city: 'Cannes',
    price: 3500000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/7c3aed/white?text=Mansion',
    description: 'Stunning mansion with infinity pool, panoramic sea views, and luxury finishes throughout. Perfect for those seeking ultimate luxury on the French Riviera.',
    bedrooms: 6,
    bathrooms: 5,
    size: 450,
    type: 'House',
  },
  {
    id: '8',
    title: 'Charming Historic Apartment',
    city: 'Paris',
    price: 1200000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/dc2626/white?text=Historic',
    description: 'Beautiful historic apartment in the Marais district with original features and modern updates. Walking distance to Notre-Dame and major attractions.',
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    type: 'Apartment',
  },
  {
    id: '9',
    title: 'Seaside Villa',
    city: 'Nice',
    price: 2800000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/0891b2/white?text=Seaside',
    description: 'Exclusive seaside villa with direct beach access, private dock, and stunning Mediterranean views. Includes guest house and landscaped gardens.',
    bedrooms: 5,
    bathrooms: 4,
    size: 380,
    type: 'Villa',
  },
  {
    id: '10',
    title: 'Downtown Loft',
    city: 'Lyon',
    price: 650000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/f59e0b/white?text=Loft',
    description: 'Industrial-style loft in the heart of Lyon with exposed brick, high ceilings, and modern kitchen. Perfect for urban living with city views.',
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    type: 'Apartment',
  },
  {
    id: '11',
    title: 'Countryside Estate',
    city: 'Bordeaux',
    price: 1950000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/10b981/white?text=Estate',
    description: 'Magnificent countryside estate with vineyards, horse stables, and guest cottages. Over 5 hectares of land with mature gardens and woodlands.',
    bedrooms: 8,
    bathrooms: 6,
    size: 600,
    type: 'House',
  },
  {
    id: '12',
    title: 'Skyline Penthouse',
    city: 'Marseille',
    price: 1800000,
    currency: '€',
    image: 'https://via.placeholder.com/400x300/8b5cf6/white?text=Penthouse',
    description: 'Breathtaking penthouse with 360-degree city and sea views. Features a private rooftop terrace, home cinema, and state-of-the-art smart home technology.',
    bedrooms: 4,
    bathrooms: 3,
    size: 200,
    type: 'Penthouse',
  },
];

// Helper function to get a property by ID
export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(property => property.id === id);
};

// Helper function to get properties by city
export const getPropertiesByCity = (city: string): Property[] => {
  return mockProperties.filter(property => 
    property.city.toLowerCase() === city.toLowerCase()
  );
};

// Helper function to get properties in a price range
export const getPropertiesByPriceRange = (min: number, max: number): Property[] => {
  return mockProperties.filter(property => 
    property.price >= min && property.price <= max
  );
};
