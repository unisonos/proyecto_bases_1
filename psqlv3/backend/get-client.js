const { Client } = require("pg");
require("dotenv").config();

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const getClient = async () => {
  const client = new Client({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    port: POSTGRES_PORT,
    ssl: false,
  });
  await client.connect();
  console.log('Connected to PostgreSQL');
  return client;
};

module.exports = {
  getClient,
}
