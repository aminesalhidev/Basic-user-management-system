// src/databasepg/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',    
  database: 'user_manager', 
  password: 'Kaltouma01',  
  port: 5432,           
});

export default pool;


