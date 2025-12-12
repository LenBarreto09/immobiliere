import { z } from 'zod';
/**
 * Zod schema for Property entity validation
 */
export declare const PropertySchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    city: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    image: z.ZodNullable<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    description: z.ZodOptional<z.ZodString>;
    bedrooms: z.ZodOptional<z.ZodNumber>;
    bathrooms: z.ZodOptional<z.ZodNumber>;
    surface: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        Apartment: "Apartment";
        House: "House";
        Villa: "Villa";
        Studio: "Studio";
        Penthouse: "Penthouse";
        Townhouse: "Townhouse";
    }>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Zod schema for creating a property (without id, timestamps)
 */
export declare const CreatePropertySchema: z.ZodObject<{
    title: z.ZodString;
    city: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    image: z.ZodNullable<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    description: z.ZodOptional<z.ZodString>;
    bedrooms: z.ZodOptional<z.ZodNumber>;
    bathrooms: z.ZodOptional<z.ZodNumber>;
    surface: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        Apartment: "Apartment";
        House: "House";
        Villa: "Villa";
        Studio: "Studio";
        Penthouse: "Penthouse";
        Townhouse: "Townhouse";
    }>>;
}, z.core.$strip>;
/**
 * Zod schema for updating a property (all fields optional except id)
 */
export declare const UpdatePropertySchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodString>;
    image: z.ZodNullable<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    description: z.ZodOptional<z.ZodString>;
    bedrooms: z.ZodOptional<z.ZodNumber>;
    bathrooms: z.ZodOptional<z.ZodNumber>;
    surface: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        Apartment: "Apartment";
        House: "House";
        Villa: "Villa";
        Studio: "Studio";
        Penthouse: "Penthouse";
        Townhouse: "Townhouse";
    }>>;
}, z.core.$strip>;
/**
 * Zod schema for route parameters validation
 */
export declare const PropertyIdParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
/**
 * Type exports for auto-typing DTOs
 */
export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
export type UpdatePropertyInput = z.infer<typeof UpdatePropertySchema>;
export type PropertyIdParams = z.infer<typeof PropertyIdParamsSchema>;
//# sourceMappingURL=property.d.ts.map