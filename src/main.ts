import { ENV } from './env';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix(ENV.API_PREFIX);
  const swaggerConfig = new DocumentBuilder()
    .setTitle(ENV.API_TITLE)
    .setDescription(ENV.API_DESC)
    .setVersion(ENV.API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(ENV.port);
}
bootstrap();
