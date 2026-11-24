import pg from 'pg'

const { Pool } = pg

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL no está definida. La API fallará al consultar la base de datos.')
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  max: Number(process.env.DATABASE_POOL_SIZE || 10),
})

export async function query(text, values = []) {
  return pool.query(text, values)
}
