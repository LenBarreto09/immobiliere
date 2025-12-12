"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyStore = void 0;
const crypto_1 = require("crypto");
// In-memory storage for properties
let properties = [
    {
        id: '1',
        title: 'Beautiful Apartment in Paris',
        city: 'Paris',
        price: 450000,
        currency: '€',
        surface: 75,
        bedrooms: 2,
        bathrooms: 1,
        type: 'Apartment',
        description: 'A charming apartment in the heart of Paris with modern amenities.',
        yearBuilt: 2010,
    },
    {
        id: '2',
        title: 'Modern Villa in Cannes',
        city: 'Cannes',
        price: 1200000,
        currency: '€',
        surface: 200,
        bedrooms: 4,
        bathrooms: 3,
        type: 'Villa',
        description: 'Luxurious villa with sea views and private pool.',
        yearBuilt: 2018,
    },
];
exports.propertyStore = {
    // Get all properties
    getAll() {
        return [...properties];
    },
    // Get property by ID
    getById(id) {
        return properties.find(property => property.id === id);
    },
    // Create new property
    create(propertyData) {
        const newProperty = {
            id: (0, crypto_1.randomUUID)(),
            ...propertyData,
        };
        properties.push(newProperty);
        return newProperty;
    },
    // Update property
    update(id, updateData) {
        const index = properties.findIndex(property => property.id === id);
        if (index === -1) {
            return null;
        }
        const existingProperty = properties[index];
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
            yearBuilt: updateData.yearBuilt ?? existingProperty.yearBuilt,
        };
        properties[index] = updatedProperty;
        return updatedProperty;
    },
    // Delete property
    delete(id) {
        const index = properties.findIndex(property => property.id === id);
        if (index === -1) {
            return false;
        }
        properties.splice(index, 1);
        return true;
    },
};
//# sourceMappingURL=propertyStore.js.map