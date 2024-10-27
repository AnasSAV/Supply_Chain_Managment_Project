const pool = require('./src/models/db');
const bcrypt = require('bcrypt');

async function hashPasswords() {
  const [assistants] = await pool.query('SELECT assistant_id, password FROM assistant');
  for (const assistant of assistants) {
    const hashedPassword = await bcrypt.hash(assistant.password, 10);
    await pool.query('UPDATE assistant SET password = ? WHERE assistant_id = ?', [hashedPassword, assistant.assistant_id]);
  }
  console.log('Assistant passwords hashed successfully.');
  process.exit();
}

hashPasswords();

