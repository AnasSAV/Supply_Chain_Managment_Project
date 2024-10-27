const pool = require('./src/models/db');
const bcrypt = require('bcrypt');

async function hashPasswords() {
  const [managers] = await pool.query('SELECT manager_id, password FROM manager');
  for (const manager of managers) {
    const hashedPassword = await bcrypt.hash(manager.password, 10);
    await pool.query('UPDATE manager SET password = ? WHERE manager_id = ?', [hashedPassword, manager.manager_id]);
  }
  console.log('Manager passwords hashed successfully.');
  process.exit();
}

hashPasswords();

