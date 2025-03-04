import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swagger(app: INestApplication) {
  SwaggerModule.setup('api', app, createDocument(app));
  Logger.log('Swagger Document is running on /swagger');
}

const ENV = process.env.NODE_ENV ?? 'Dev';

function createDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(`News aggregation web ${ENV}`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  return document;
}
