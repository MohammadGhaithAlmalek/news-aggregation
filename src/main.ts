import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { swagger } from './swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          if (error.constraints) {
            return error.constraints[Object.keys(error.constraints)[0]];
          }
          return 'Invalid input';
        });
        return new BadRequestException({
          message: messages,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      },
      transform: true,
      whitelist: true,
    }),
  );

  swagger(app);

  const config = app.get(ConfigService);
  const PORT: number = config.get('PORT') ?? 3000;

  Logger.log(`news aggregation Backend Started on port: ${PORT}`);

  await app.listen(PORT);
}
bootstrap();
