// reset_admin_password.js

const pool = require('./src/models/db'); // Adjust the path if necessary
const bcrypt = require('bcrypt');
require('dotenv').config(); // Ensure this is at the top to load environment variables

async function resetAdminPassword(email, newPassword) {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the admin's password in the database
    const [result] = await pool.query(
      'UPDATE admin SET password = ? WHERE email = ?',
      [hashedPassword, email]
    );

    if (result.affectedRows > 0) {
      console.log(`Password for ${email} has been updated successfully.`);
    } else {
      console.log(`Admin with email ${email} not found.`);
    }

    process.exit(0); // Exit the script successfully
  } catch (error) {
    console.error('Error resetting admin password:', error);
    process.exit(1); // Exit the script with an error
  }
}

// Replace with your admin's email and desired new password
resetAdminPassword('john.doe@gmail.com', 'Admin123');
