import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { propertyService } from '../services/propertyService';
import {
  CreatePropertySchema,
  UpdatePropertySchema,
  PropertyIdParamsSchema,
  CreatePropertyInput,
  UpdatePropertyInput,
  PropertyIdParams
} from '../schemas/property';

/**
 * Route handlers for property operations
 * Handles HTTP requests and delegates business logic to services
 */
export async function propertyRoutes(fastify: FastifyInstance) {
  /**
   * GET /items - List all properties
   */
  fastify.get('/items', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = await propertyService.getAllProperties();
      return reply.code(200).send(result);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  /**
   * GET /items/:id - Get single property by ID
   */
  fastify.get('/items/:id', async (request: FastifyRequest<{ Params: PropertyIdParams }>, reply: FastifyReply) => {
    try {
      // Validate route parameters
      const paramsResult = PropertyIdParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.code(400).send({
          error: 'Invalid request parameters',
          details: paramsResult.error.issues
        });
      }

      const { id } = paramsResult.data;
      const property = await propertyService.getPropertyById(id);

      if (!property) {
        return reply.code(404).send({ error: 'Property not found' });
      }

      return reply.code(200).send(property);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  /**
   * POST /items - Create new property
   */
  fastify.post('/items', async (request: FastifyRequest<{ Body: CreatePropertyInput }>, reply: FastifyReply) => {
    try {
      // Validate request body
      const bodyResult = CreatePropertySchema.safeParse(request.body);
      if (!bodyResult.success) {
        return reply.code(400).send({
          error: 'Invalid request body',
          details: bodyResult.error.issues
        });
      }

      const createData = bodyResult.data;
      const newProperty = await propertyService.createProperty(createData);

      return reply.code(201).send(newProperty);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  /**
   * PUT /items/:id - Update existing property
   */
  fastify.put('/items/:id', async (request: FastifyRequest<{ Params: PropertyIdParams; Body: UpdatePropertyInput }>, reply: FastifyReply) => {
    try {
      // Validate route parameters
      const paramsResult = PropertyIdParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.code(400).send({
          error: 'Invalid request parameters',
          details: paramsResult.error.issues
        });
      }

      // Validate request body
      const bodyResult = UpdatePropertySchema.safeParse(request.body);
      if (!bodyResult.success) {
        return reply.code(400).send({
          error: 'Invalid request body',
          details: bodyResult.error.issues
        });
      }

      const { id } = paramsResult.data;
      const updateData = bodyResult.data;

      const updatedProperty = await propertyService.updateProperty(id, updateData);

      if (!updatedProperty) {
        return reply.code(404).send({ error: 'Property not found' });
      }

      return reply.code(200).send(updatedProperty);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  /**
   * DELETE /items/:id - Delete property
   */
  fastify.delete('/items/:id', async (request: FastifyRequest<{ Params: PropertyIdParams }>, reply: FastifyReply) => {
    try {
      // Validate route parameters
      const paramsResult = PropertyIdParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.code(400).send({
          error: 'Invalid request parameters',
          details: paramsResult.error.issues
        });
      }

      const { id } = paramsResult.data;
      const deleted = await propertyService.deleteProperty(id);

      if (!deleted) {
        return reply.code(404).send({ error: 'Property not found' });
      }

      return reply.code(204).send();
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
