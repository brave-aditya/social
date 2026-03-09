import mysql from "mysql2"
import * as dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createPool({
   host: process.env.HOST,
   user: process.env.DB_USER,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
   port: process.env.DB_PORT || 4000,
   ssl: {
     minVersion: 'TLSv1.2',
     rejectUnauthorized: true
   }
});