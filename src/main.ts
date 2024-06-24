import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/http-exception.filter';
import { config } from 'dotenv';
async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  const chuckNorrisSwaggerOptions = new DocumentBuilder()
    .setTitle('[Chuck Norris] - Chuck Norris API')
    .setDescription('Routes to get all Chuck Norris information.')
    .setVersion('1.0')
    .addServer(process.env.SWAGGER_URL, 'Local')
    .addTag('Chuck-Norris')
    .build();

  const chuckNorrisDocument = SwaggerModule.createDocument(
    app,
    chuckNorrisSwaggerOptions,
    { include: [AppModule] },
  );
  SwaggerModule.setup('docs/api', app, chuckNorrisDocument);

  await app.listen(process.env.APP);
}
bootstrap();
