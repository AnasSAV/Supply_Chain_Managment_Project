const pool = require('./src/models/db');
const bcrypt = require('bcrypt');

async function hashPasswords() {
  const [drivers] = await pool.query('SELECT driver_id, password FROM driver');
  for (const driver of drivers) {
    const hashedPassword = await bcrypt.hash(driver.password, 10);
    await pool.query('UPDATE driver SET password = ? WHERE driver_id = ?', [hashedPassword, driver.driver_id]);
  }
  console.log('Passwords hashed successfully.');
  process.exit();
}

hashPasswords();
