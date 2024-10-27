const pool = require('./src/models/db');
const bcrypt = require('bcrypt');

async function hashPasswords() {
  const [customers] = await pool.query('SELECT customer_id, password FROM customer');
  for (const customer of customers) {
    const hashedPassword = await bcrypt.hash(customer.password, 10);
    await pool.query('UPDATE customer SET password = ? WHERE customer_id = ?', [hashedPassword, customer.customer_id]);
  }
  console.log('Passwords hashed successfully.');
  process.exit();
}

hashPasswords();
