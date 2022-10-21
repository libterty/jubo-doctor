import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from '@server/config/general'

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.DB_SETTINGS.host,
  port: config.DB_SETTINGS.port,
  username: config.DB_SETTINGS.username,
  password: config.DB_SETTINGS.password,
  database: config.DB_SETTINGS.database,
  entities: [],
  migrations: [`${__dirname}./migration/*.ts`],
  subscribers: [],
  synchronize: true,
  logging: false,
}
