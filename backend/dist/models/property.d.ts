/**
 * Core Property entity model
 */
export interface Property {
    id: string;
    title: string;
    city: string;
    price: number;
    currency?: string;
    image?: string | null;
    description?: string;
    bedrooms?: number;
    bathrooms?: number;
    surface?: number;
    type?: string;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * DTOs imported from Zod schemas for auto-typing
 */
export type { CreatePropertyInput as CreatePropertyDto } from '../schemas/property';
export type { UpdatePropertyInput as UpdatePropertyDto } from '../schemas/property';
/**
 * DTO for property response (what we send to client)
 */
export interface PropertyResponseDto {
    id: string;
    title: string;
    city: string;
    price: number;
    currency?: string;
    image?: string | null;
    description?: string;
    bedrooms?: number;
    bathrooms?: number;
    size?: number;
    type?: string;
    createdAt: string;
    updatedAt: string;
}
/**
 * DTO for property list response (paginated if needed)
 */
export interface PropertyListResponseDto {
    items: PropertyResponseDto[];
    total: number;
}
/**
 * Route parameters DTO imported from Zod schema
 */
export type { PropertyIdParams } from '../schemas/property';
//# sourceMappingURL=property.d.ts.map