import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen({ port: process.env.PORT ? parseInt(process.env.PORT) : 3001, host: '0.0.0.0' });
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
