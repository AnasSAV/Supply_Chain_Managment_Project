// hash_admin_passwords.js
const pool = require('./src/models/db');
const bcrypt = require('bcrypt');

async function hashPasswords() {
  const [admins] = await pool.query('SELECT admin_id, password FROM admin');
  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    await pool.query('UPDATE admin SET password = ? WHERE admin_id = ?', [hashedPassword, admin.admin_id]);
  }
  console.log('Passwords hashed successfully.');
  process.exit();
}

hashPasswords();
