// src/services/programService.js
const { sql, poolPromise } = require('../config/dbConfig');

async function getProgramsByEmployeeEmail(employeeEmail) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('employee_email', sql.VarChar, employeeEmail)
      .query(`
        SELECT program_id, employee_email, subject, description, link
        FROM Programs
        WHERE employee_email = @employee_email
      `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = {
  getProgramsByEmployeeEmail,
};
