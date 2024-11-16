// src/services/leaveService.js
const { sql, poolPromise } = require('../config/dbConfig');

async function addLeaveRecord(employeeEmail, leaveType, startDate, endDate, information, approved) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('employee_email', sql.VarChar, employeeEmail)
      .input('leave_type', sql.VarChar, leaveType)
      .input('start_date', sql.Date, startDate)
      .input('end_date', sql.Date, endDate)
      .input('information', sql.Text, information)
      .input('approved', sql.Bit, approved)
      .query(`
        INSERT INTO Leave (employee_email, leave_type, start_date, end_date, information, approved)
        VALUES (@employee_email, @leave_type, @start_date, @end_date, @information, @approved)
      `);
    return result.rowsAffected[0]; // Returns 1 if insertion was successful
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = {
  addLeaveRecord,
};
