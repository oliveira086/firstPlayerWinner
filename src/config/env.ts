import envVar from 'env-var';

export const ENVIRONMENT = envVar
  .get('ENVIRONMENT')
  .default('development')
  .asEnum(['development', 'production']);

export const JWT_SECRET = envVar.get('JWT_SECRET').default('any').asString();

export const JWT_EXPIRATION_IN_SECOUNDS = envVar
  .get('JWT_EXPIRATION_IN_SECOUNDS')
  .default(3600)
  .asIntPositive();

export const IS_PRODUCTION = ENVIRONMENT === 'production';

export const DB_HOST = envVar.get('DB_HOST').default('localhost').asString();

export const DB_PORT = envVar.get('DB_PORT').default(3306).asPortNumber();
export const DB_USERNAME = envVar
  .get('DB_USERNAME')
  .default('admin')
  .asString();

export const DB_PASSWORD = envVar
  .get('DB_PASSWORD')
  .default('admin')
  .asString();

export const PORT = envVar.get('PORT').default(3000).asPortNumber();

export const DB_NAME = envVar.get('DB_NAME').default('FPW_DB').asString();
