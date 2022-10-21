import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
import { AppModule } from '@server/app.module'
import { config } from '@server/config/general'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule)

  // Validation setting
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      validationError: { target: true },
      transform: true,
    }),
  )

  // Api prefix
  app.setGlobalPrefix(`${config.API_EXPLORER_PATH}/${config.PREFIX}`)

  // Cors setting
  app.enableCors({
    credentials: true,
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })

  // Parser setting
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

  // Security protection
  app.use(helmet())

  // This is swagger docs setting, doc path is under /docs
  const apiConfig = new DocumentBuilder()
    .setTitle(config.NAME)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .build()
  const apiDocs = SwaggerModule.createDocument(app, apiConfig)
  SwaggerModule.setup('docs', app, apiDocs)

  // This is used for listening shutdown, so we can implement graceful shutdown
  app.enableShutdownHooks()

  await app.listen(config.PORT)
  Logger.log(`Server start on ${config.HOST}:${config.PORT}`, 'Bootstrap', true)
}
bootstrap()
