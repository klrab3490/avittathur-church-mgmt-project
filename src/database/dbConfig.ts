import mysql, { Pool } from 'mysql2/promise';

const dbConfig: mysql.PoolOptions = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '2003',
  database: 'chruch',
};

const pool: Pool = mysql.createPool(dbConfig);

export default pool;
