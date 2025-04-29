const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.development.local') });
const { Pool } = require('pg'); 

// Log the connection URL to verify it's loaded correctly
console.log('Attempting to connect to:', process.env.POSTGRES_URL);

const pool = new Pool({ 
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false
  }
}); 

async function testConnection() { 
  try { 
    const client = await pool.connect(); 
    console.log('✅ Connected to Vercel/Neon PostgreSQL!'); 
    
    const res = await client.query('SELECT NOW() as time'); 
    console.log('Database time:', res.rows[0].time); 
    
    client.release(); 
  } catch (err) { 
    console.error('❌ Connection failed:', err.message); 
    console.error('Error details:', err); 
  } finally { 
    await pool.end(); 
  } 
} 

testConnection();