import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

let dbConfig: DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    dbConfig = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      migrations: ['migrations/*.{ts,js}'],
      synchronize: false,
    };
    break;
  case 'test':
    dbConfig = {
      type: 'sqlite',
      database: 'test-db.sqlite',
      entities: [User, Report],
      migrations: ['migrations/*.{ts,js}'],
      synchronize: false,
    };
    break;
  case 'production':
    dbConfig = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Report],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    break;
  default:
    throw new Error('Unknown environment');
}

export const AppDataSource = new DataSource(dbConfig);
