import dotenv from "dotenv";
dotenv.config();

const configSql = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  encrypt: false,
};

const configMysql = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
};

export { configSql, configMysql };
