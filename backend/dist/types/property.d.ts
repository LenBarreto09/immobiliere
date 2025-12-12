import { z } from 'zod';
export interface Property {
    id: string;
    title: string;
    city: string;
    price: number;
    currency?: string;
    image?: string;
    description?: string;
    bedrooms?: number;
    bathrooms?: number;
    surface?: number;
    type?: string;
    yearBuilt?: number;
}
export declare const PropertySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    city: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodOptional<z.ZodString>;
    image: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    description: z.ZodOptional<z.ZodString>;
    bedrooms: z.ZodOptional<z.ZodNumber>;
    bathrooms: z.ZodOptional<z.ZodNumber>;
    surface: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodString>;
    yearBuilt: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const CreatePropertySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    city: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodOptional<z.ZodString>;
    image: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    description: z.ZodOptional<z.ZodString>;
    bedrooms: z.ZodOptional<z.ZodNumber>;
    bathrooms: z.ZodOptional<z.ZodNumber>;
    surface: z.ZodOptional<z.ZodNumber>;
    yearBuilt: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const UpdatePropertySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bedrooms: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    bathrooms: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    surface: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    yearBuilt: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
//# sourceMappingURL=property.d.ts.map