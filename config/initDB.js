const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.development.local') });
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTables() {
  const client = await pool.connect();
  try {
    // Create travels table
    await client.query(`
      CREATE TABLE IF NOT EXISTS travels (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        departure_date TIMESTAMP NOT NULL,
        return_date TIMESTAMP NOT NULL,
        duration INTEGER NOT NULL,
        image_filename VARCHAR(255),
        image_data BYTEA,
        image_content_type VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Travels table created successfully');

    // Create travel_packs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS travel_packs (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        travel_id INTEGER REFERENCES travels(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Travel packs table created successfully');

  } catch (err) {
    console.error('❌ Error creating tables:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

createTables()
  .then(() => console.log('✅ Database initialization completed'))
  .catch(err => console.error('❌ Database initialization failed:', err));