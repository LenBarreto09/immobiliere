"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyService = exports.PropertyService = void 0;
const crypto_1 = require("crypto");
/**
 * In-memory implementation of PropertyRepository
 * In production, this would be replaced with a database implementation
 */
class InMemoryPropertyRepository {
    constructor() {
        this.properties = [
            {
                id: '1',
                title: 'Modern Apartment in City Center',
                city: 'Paris',
                price: 850000,
                currency: '€',
                image: 'https://via.placeholder.com/400x300/4f46e5/white?text=Property+Image',
                description: 'Beautiful modern apartment located in the heart of Paris. This stunning property features high-end finishes, floor-to-ceiling windows with city views, and premium appliances throughout.',
                surface: 85,
                bedrooms: 2,
                bathrooms: 2,
                type: 'Apartment',
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-01'),
            },
            {
                id: '2',
                title: 'Luxury Villa with Garden',
                city: 'Nice',
                price: 1200000,
                currency: '€',
                image: 'https://via.placeholder.com/400x300/059669/white?text=Villa+Image',
                description: 'Stunning luxury villa with beautiful garden and pool area. Perfect for families seeking luxury living in the French Riviera.',
                surface: 220,
                bedrooms: 4,
                bathrooms: 3,
                type: 'Villa',
                createdAt: new Date('2024-01-02'),
                updatedAt: new Date('2024-01-02'),
            },
            {
                id: '3',
                title: 'Cozy Studio Near Metro',
                city: 'Lyon',
                price: 320000,
                currency: '€',
                description: 'Perfect starter home or investment property. Located just minutes from metro station with easy access to city center.',
                surface: 35,
                bedrooms: 1,
                bathrooms: 1,
                type: 'Studio',
                createdAt: new Date('2024-01-03'),
                updatedAt: new Date('2024-01-03'),
            },
            {
                id: '4',
                title: 'Penthouse with Terrace',
                city: 'Cannes',
                price: 2500000,
                currency: '€',
                image: 'https://via.placeholder.com/400x300/6366f1/white?text=Penthouse',
                description: 'Exclusive penthouse with panoramic views and private terrace. Ultimate luxury living on the French Riviera.',
                surface: 150,
                bedrooms: 3,
                bathrooms: 3,
                type: 'Penthouse',
                createdAt: new Date('2024-01-04'),
                updatedAt: new Date('2024-01-04'),
            },
            {
                id: '5',
                title: 'Family House with Garden',
                city: 'Bordeaux',
                price: 680000,
                currency: '€',
                image: 'https://via.placeholder.com/400x300/059669/white?text=House+Image',
                description: 'Spacious family home with large garden. Perfect for families with children, quiet neighborhood with good schools nearby.',
                surface: 180,
                bedrooms: 4,
                bathrooms: 2,
                type: 'House',
                createdAt: new Date('2024-01-05'),
                updatedAt: new Date('2024-01-05'),
            },
            {
                id: '6',
                title: 'Modern Townhouse',
                city: 'Toulouse',
                price: 450000,
                currency: '€',
                image: 'https://via.placeholder.com/400x300/4f46e5/white?text=Townhouse',
                description: 'Contemporary townhouse with modern amenities and small private garden. Great location near public transport.',
                surface: 125,
                bedrooms: 3,
                bathrooms: 2,
                type: 'Townhouse',
                createdAt: new Date('2024-01-06'),
                updatedAt: new Date('2024-01-06'),
            },
        ];
    }
    async findAll() {
        return [...this.properties];
    }
    async findById(id) {
        return this.properties.find(property => property.id === id) || null;
    }
    async create(propertyData) {
        const now = new Date();
        const newProperty = {
            id: (0, crypto_1.randomUUID)(),
            ...propertyData,
            createdAt: now,
            updatedAt: now,
        };
        this.properties.push(newProperty);
        return newProperty;
    }
    async update(id, updateData) {
        const index = this.properties.findIndex(property => property.id === id);
        if (index === -1) {
            return null;
        }
        const existingProperty = this.properties[index];
        const updatedProperty = {
            id: existingProperty.id,
            title: updateData.title ?? existingProperty.title,
            city: updateData.city ?? existingProperty.city,
            price: updateData.price ?? existingProperty.price,
            currency: updateData.currency ?? existingProperty.currency,
            image: updateData.image ?? existingProperty.image,
            description: updateData.description ?? existingProperty.description,
            bedrooms: updateData.bedrooms ?? existingProperty.bedrooms,
            bathrooms: updateData.bathrooms ?? existingProperty.bathrooms,
            surface: updateData.surface ?? existingProperty.surface,
            type: updateData.type ?? existingProperty.type,
            createdAt: existingProperty.createdAt,
            updatedAt: new Date(),
        };
        this.properties[index] = updatedProperty;
        return updatedProperty;
    }
    async delete(id) {
        const index = this.properties.findIndex(property => property.id === id);
        if (index === -1) {
            return false;
        }
        this.properties.splice(index, 1);
        return true;
    }
}
/**
 * Property service class
 * Handles business logic and data transformation
 */
class PropertyService {
    constructor(repository = new InMemoryPropertyRepository()) {
        this.repository = repository;
    }
    /**
     * Get all properties
     */
    async getAllProperties() {
        const properties = await this.repository.findAll();
        const responseItems = properties.map(this.mapToResponseDto);
        return {
            items: responseItems,
            total: responseItems.length,
        };
    }
    /**
     * Get property by ID
     */
    async getPropertyById(id) {
        const property = await this.repository.findById(id);
        return property ? this.mapToResponseDto(property) : null;
    }
    /**
     * Create a new property
     */
    async createProperty(createDto) {
        // Business logic can be added here (validation, calculations, etc.)
        const propertyData = {
            ...createDto,
            // Set defaults if needed
            currency: createDto.currency || '€',
        };
        const property = await this.repository.create(propertyData);
        return this.mapToResponseDto(property);
    }
    /**
     * Update an existing property
     */
    async updateProperty(id, updateDto) {
        // Business logic can be added here
        const updatedProperty = await this.repository.update(id, updateDto);
        return updatedProperty ? this.mapToResponseDto(updatedProperty) : null;
    }
    /**
     * Delete a property
     */
    async deleteProperty(id) {
        return await this.repository.delete(id);
    }
    /**
     * Helper method to transform Property entity to response DTO
     */
    mapToResponseDto(property) {
        return {
            id: property.id,
            title: property.title,
            city: property.city,
            price: property.price,
            currency: property.currency,
            image: property.image,
            description: property.description,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            size: property.surface, // Map 'surface' to 'size' for frontend compatibility
            type: property.type,
            createdAt: property.createdAt.toISOString(),
            updatedAt: property.updatedAt.toISOString(),
        };
    }
}
exports.PropertyService = PropertyService;
// Export singleton instance for dependency injection
exports.propertyService = new PropertyService();
//# sourceMappingURL=propertyService.js.map