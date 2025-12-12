"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePropertySchema = exports.CreatePropertySchema = exports.PropertySchema = void 0;
const zod_1 = require("zod");
exports.PropertySchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(), // Will be generated on creation
    title: zod_1.z.string().min(1, 'Title is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    price: zod_1.z.number().positive('Price must be positive'),
    currency: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
    description: zod_1.z.string().optional(),
    bedrooms: zod_1.z.number().int().min(0).optional(),
    bathrooms: zod_1.z.number().min(0).optional(),
    surface: zod_1.z.number().min(0).optional(), // Maps to 'size' in frontend
    type: zod_1.z.string().optional(),
    yearBuilt: zod_1.z.number().int().min(1800).optional(),
});
exports.CreatePropertySchema = exports.PropertySchema.omit({ id: true });
exports.UpdatePropertySchema = exports.PropertySchema.partial();
//# sourceMappingURL=property.js.map