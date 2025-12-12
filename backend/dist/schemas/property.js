"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyIdParamsSchema = exports.UpdatePropertySchema = exports.CreatePropertySchema = exports.PropertySchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for Property entity validation
 */
exports.PropertySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
    city: zod_1.z.string().min(1, 'City is required').max(100, 'City must be less than 100 characters'),
    price: zod_1.z.number().positive('Price must be positive').max(100000000, 'Price is too high'),
    currency: zod_1.z.string().length(1, 'Currency must be a single character').optional().default('€'),
    image: zod_1.z.string().url('Image must be a valid URL').optional().or(zod_1.z.literal('')).nullable(),
    description: zod_1.z.string().max(1000, 'Description must be less than 1000 characters').optional(),
    bedrooms: zod_1.z.number().int().min(0, 'Bedrooms cannot be negative').max(50, 'Too many bedrooms').optional(),
    bathrooms: zod_1.z.number().min(0, 'Bathrooms cannot be negative').max(20, 'Too many bathrooms').optional(),
    surface: zod_1.z.number().min(0, 'Surface cannot be negative').max(10000, 'Surface is too large').optional(),
    type: zod_1.z.enum(['Apartment', 'House', 'Villa', 'Studio', 'Penthouse', 'Townhouse']).optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
/**
 * Zod schema for creating a property (without id, timestamps)
 */
exports.CreatePropertySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
    city: zod_1.z.string().min(1, 'City is required').max(100, 'City must be less than 100 characters'),
    price: zod_1.z.number().positive('Price must be positive').max(100000000, 'Price is too high'),
    currency: zod_1.z.string().length(1, 'Currency must be a single character').optional().default('€'),
    image: zod_1.z.string().url('Image must be a valid URL').optional().or(zod_1.z.literal('')).nullable(),
    description: zod_1.z.string().max(1000, 'Description must be less than 1000 characters').optional(),
    bedrooms: zod_1.z.number().int().min(0, 'Bedrooms cannot be negative').max(50, 'Too many bedrooms').optional(),
    bathrooms: zod_1.z.number().min(0, 'Bathrooms cannot be negative').max(20, 'Too many bathrooms').optional(),
    surface: zod_1.z.number().min(0, 'Surface cannot be negative').max(10000, 'Surface is too large').optional(),
    type: zod_1.z.enum(['Apartment', 'House', 'Villa', 'Studio', 'Penthouse', 'Townhouse']).optional(),
});
/**
 * Zod schema for updating a property (all fields optional except id)
 */
exports.UpdatePropertySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
    city: zod_1.z.string().min(1, 'City is required').max(100, 'City must be less than 100 characters').optional(),
    price: zod_1.z.number().positive('Price must be positive').max(100000000, 'Price is too high').optional(),
    currency: zod_1.z.string().length(1, 'Currency must be a single character').optional(),
    image: zod_1.z.string().url('Image must be a valid URL').optional().or(zod_1.z.literal('')).nullable(),
    description: zod_1.z.string().max(1000, 'Description must be less than 1000 characters').optional(),
    bedrooms: zod_1.z.number().int().min(0, 'Bedrooms cannot be negative').max(50, 'Too many bedrooms').optional(),
    bathrooms: zod_1.z.number().min(0).max(20, 'Too many bathrooms').optional(),
    surface: zod_1.z.number().min(0, 'Surface cannot be negative').max(10000, 'Surface is too large').optional(),
    type: zod_1.z.enum(['Apartment', 'House', 'Villa', 'Studio', 'Penthouse', 'Townhouse']).optional(),
});
/**
 * Zod schema for route parameters validation
 */
exports.PropertyIdParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid property ID format'),
});
//# sourceMappingURL=property.js.map