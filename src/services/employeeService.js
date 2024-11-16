// src/services/employeeService.js
const { sql, poolPromise } = require('../config/dbConfig');

// Function to retrieve employee data by email
async function getEmployeeByEmail(employeeEmail) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('employee_email', sql.VarChar, employeeEmail)
      .query(`
        SELECT *
        FROM Employees
        WHERE employee_email = @employee_email
      `);
    return result.recordset[0];
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

// Function to update personal email and mobile for an employee
async function updateEmployeeContact(employeeEmail, emailPersonal, mobile) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('employee_email', sql.VarChar, employeeEmail)
      .input('email_personal', sql.VarChar, emailPersonal)
      .input('mobile', sql.VarChar, mobile)
      .query(`
        UPDATE Employees
        SET email_personal = @email_personal, mobile = @mobile
        WHERE employee_email = @employee_email
      `);

    return result.rowsAffected[0] > 0; // Return true if an employee was updated
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = {
  getEmployeeByEmail,
  updateEmployeeContact,
};
