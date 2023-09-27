import { DatabaseConfig } from '../../../config/DatabaseConfig';

const knexConfig = {
  client: 'postgres',
  connection: DatabaseConfig.DATABASE_URL || {
    host: DatabaseConfig.DB_HOST,
    port: DatabaseConfig.DB_PORT,
    user: DatabaseConfig.DB_USER,
    password: DatabaseConfig.DB_PASSWORD,
    database: DatabaseConfig.DB_NAME,
  },
  migrations: {
    directory: `${__dirname}/migrations`,
  },
};

export default knexConfig;
