// src/services/messageService.js
const { sql, poolPromise } = require('../config/dbConfig');

async function getMessagesByEmployeeEmail(employeeEmail) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('employee_email', sql.VarChar, employeeEmail)
      .query(`
        SELECT Message.message_id, Message.subject, Message.message, Message.employee_id
        FROM Message
        INNER JOIN Employees ON Message.employee_id = Employees.employee_email
        WHERE Employees.employee_email = @employee_email
      `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = {
  getMessagesByEmployeeEmail,
};
