import { Property } from '../types/property';
export declare const propertyStore: {
    getAll(): Property[];
    getById(id: string): Property | undefined;
    create(propertyData: Omit<Property, "id">): Property;
    update(id: string, updateData: Partial<Omit<Property, "id">>): Property | null;
    delete(id: string): boolean;
};
