// src/services/attendanceService.js
const { sql, poolPromise } = require('../config/dbConfig');

// Function to get attendance records by employee email
async function getAttendanceByEmployeeEmail(employeeEmail) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('employee_email', sql.VarChar, employeeEmail)
      .query(`
        SELECT employee_email, name, surname, clocked_in
        FROM Attendance
        WHERE employee_email = @employee_email
      `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

// Function to update the clocked_in value for a specific employee
async function updateClockedInStatus(employeeEmail, clockedIn) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('employee_email', sql.VarChar, employeeEmail)
      .input('clocked_in', sql.Bit, clockedIn)
      .query(`
        UPDATE Attendance
        SET clocked_in = @clocked_in
        WHERE employee_email = @employee_email
      `);
    return result.rowsAffected[0]; // returns 1 if updated, 0 if not found
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = {
  getAttendanceByEmployeeEmail,
  updateClockedInStatus,
};
