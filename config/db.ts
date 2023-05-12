export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  dbDevelopment: string;
  dbProduction: string;
  dialect: string;
  synchronize: boolean;
}

export const db = (): DbConfig => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbDevelopment: process.env.DB_NAME_DEVELOPMENT,
  dbProduction: process.env.DB_NAME_PRODUCTION,
  dialect: process.env.DB_DIALECT,
  synchronize: process.env.DB_SYNC === 'true',
});
