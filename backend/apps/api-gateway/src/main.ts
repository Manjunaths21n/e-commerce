import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
import proxy from '@fastify/http-proxy';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const fastify = app.getHttpAdapter().getInstance();

  // User Service Proxy
  fastify.register(proxy, {
    upstream: 'http://localhost:4000',
    prefix: '/auth',
    rewritePrefix: '/auth',
  });

  // Store Service Proxy
  fastify.register(proxy, {
    upstream: 'http://localhost:4001',
    prefix: '/products',
    rewritePrefix: '/products',
  });

  fastify.register(proxy, {
    upstream: 'http://localhost:4001',
    prefix: '/categories',
    rewritePrefix: '/categories',
  });

  // Order Service Proxy
  fastify.register(proxy, {
    upstream: 'http://localhost:4002',
    prefix: '/orders',
    rewritePrefix: '/orders',
  });

  app.enableCors();
  
  await app.listen({ port: 3000, host: '0.0.0.0' });
  console.log(`API Gateway is running on: http://localhost:3000`);
}
bootstrap();
