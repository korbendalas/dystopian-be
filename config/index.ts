import { db, DbConfig } from './db';
export interface Config {
  port: number;
  jwtSecret: string;
  productKey: string;
  db: DbConfig;
}
export const config = (): Config => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  jwtSecret: process.env.JWT_SECRET,
  productKey: process.env.PRODUCT_KEY_SECRET,
  db: db(),
});
