import { User } from 'src/models';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}
