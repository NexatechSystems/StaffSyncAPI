// src/services/payslipService.js
const { sql, poolPromise } = require('../config/dbConfig');

async function getPayslipsByEmployeeEmail(employeeEmail) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('employee_email', sql.VarChar, employeeEmail)
      .query(`
        SELECT payslip_id, month, salary, bonus, total, employee_id
        FROM Payslip
        WHERE employee_id = @employee_email
      `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = {
  getPayslipsByEmployeeEmail,
};
