import { Property, PropertyResponseDto, PropertyListResponseDto } from '../models/property';
import { CreatePropertyInput, UpdatePropertyInput } from '../schemas/property';
/**
 * Repository interface for property data access
 * This abstraction allows for easy switching between in-memory, database, etc.
 */
export interface PropertyRepository {
    findAll(): Promise<Property[]>;
    findById(id: string): Promise<Property | null>;
    create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property>;
    update(id: string, property: Partial<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Property | null>;
    delete(id: string): Promise<boolean>;
}
/**
 * Property service class
 * Handles business logic and data transformation
 */
export declare class PropertyService {
    private repository;
    constructor(repository?: PropertyRepository);
    /**
     * Get all properties
     */
    getAllProperties(): Promise<PropertyListResponseDto>;
    /**
     * Get property by ID
     */
    getPropertyById(id: string): Promise<PropertyResponseDto | null>;
    /**
     * Create a new property
     */
    createProperty(createDto: CreatePropertyInput): Promise<PropertyResponseDto>;
    /**
     * Update an existing property
     */
    updateProperty(id: string, updateDto: UpdatePropertyInput): Promise<PropertyResponseDto | null>;
    /**
     * Delete a property
     */
    deleteProperty(id: string): Promise<boolean>;
    /**
     * Helper method to transform Property entity to response DTO
     */
    private mapToResponseDto;
}
export declare const propertyService: PropertyService;
//# sourceMappingURL=propertyService.d.ts.map