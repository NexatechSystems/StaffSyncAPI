// src/routes/payslipRoutes.js
const express = require('express');
const router = express.Router();
const payslipService = require('../services/payslipService');

// Route to get all payslips for a specific employee email
router.get('/payslips/:email', async (req, res) => {
  const employeeEmail = req.params.email;

  try {
    const payslips = await payslipService.getPayslipsByEmployeeEmail(employeeEmail);
    if (payslips.length > 0) {
      res.status(200).json(payslips);
    } else {
      res.status(404).json({ message: 'No payslips found for this employee' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
