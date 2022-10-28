require("dotenv").config();
const env = process.env;
const development = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_MYDATABASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
};
const test = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_TESTBASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
};
const production = {
  username: env.DB_USERNAME,
  password: env.DB_UNPASSWORD,
  database: env.DB_PROBASE,
  host: env.DB_MYHOST,
  dialect: env.DB_DIALECT,
};
module.exports = { development, production, test };