import { z } from 'zod';

/**
 * Zod schema for Property entity validation
 */
export const PropertySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  city: z.string().min(1, 'City is required').max(100, 'City must be less than 100 characters'),
  price: z.number().positive('Price must be positive').max(100000000, 'Price is too high'),
  currency: z.string().length(1, 'Currency must be a single character').optional().default('€'),
  image: z.string().url('Image must be a valid URL').optional().or(z.literal('')).nullable(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  bedrooms: z.number().int().min(0, 'Bedrooms cannot be negative').max(50, 'Too many bedrooms').optional(),
  bathrooms: z.number().min(0, 'Bathrooms cannot be negative').max(20, 'Too many bathrooms').optional(),
  surface: z.number().min(0, 'Surface cannot be negative').max(10000, 'Surface is too large').optional(),
  type: z.enum(['Apartment', 'House', 'Villa', 'Studio', 'Penthouse', 'Townhouse']).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Zod schema for creating a property (without id, timestamps)
 */
export const CreatePropertySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  city: z.string().min(1, 'City is required').max(100, 'City must be less than 100 characters'),
  price: z.number().positive('Price must be positive').max(100000000, 'Price is too high'),
  currency: z.string().length(1, 'Currency must be a single character').optional().default('€'),
  image: z.string().url('Image must be a valid URL').optional().or(z.literal('')).nullable(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  bedrooms: z.number().int().min(0, 'Bedrooms cannot be negative').max(50, 'Too many bedrooms').optional(),
  bathrooms: z.number().min(0, 'Bathrooms cannot be negative').max(20, 'Too many bathrooms').optional(),
  surface: z.number().min(0, 'Surface cannot be negative').max(10000, 'Surface is too large').optional(),
  type: z.enum(['Apartment', 'House', 'Villa', 'Studio', 'Penthouse', 'Townhouse']).optional(),
});

/**
 * Zod schema for updating a property (all fields optional except id)
 */
export const UpdatePropertySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  city: z.string().min(1, 'City is required').max(100, 'City must be less than 100 characters').optional(),
  price: z.number().positive('Price must be positive').max(100000000, 'Price is too high').optional(),
  currency: z.string().length(1, 'Currency must be a single character').optional(),
  image: z.string().url('Image must be a valid URL').optional().or(z.literal('')).nullable(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  bedrooms: z.number().int().min(0, 'Bedrooms cannot be negative').max(50, 'Too many bedrooms').optional(),
  bathrooms: z.number().min(0).max(20, 'Too many bathrooms').optional(),
  surface: z.number().min(0, 'Surface cannot be negative').max(10000, 'Surface is too large').optional(),
  type: z.enum(['Apartment', 'House', 'Villa', 'Studio', 'Penthouse', 'Townhouse']).optional(),
});

/**
 * Zod schema for route parameters validation
 */
export const PropertyIdParamsSchema = z.object({
  id: z.string().uuid('Invalid property ID format'),
});

/**
 * Type exports for auto-typing DTOs
 */
export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
export type UpdatePropertyInput = z.infer<typeof UpdatePropertySchema>;
export type PropertyIdParams = z.infer<typeof PropertyIdParamsSchema>;
