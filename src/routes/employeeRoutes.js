// src/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');

// GET route to retrieve employee data by email
router.get('/employee/:email', async (req, res) => {
  const employeeEmail = req.params.email;

  try {
    const employeeData = await employeeService.getEmployeeByEmail(employeeEmail);
    if (employeeData) {
      res.status(200).json(employeeData);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT route to update personal email and mobile
router.put('/employee/:email', async (req, res) => {
  const employeeEmail = req.params.email;
  const { email_personal, mobile } = req.body;

  try {
    const updateResult = await employeeService.updateEmployeeContact(employeeEmail, email_personal, mobile);
    if (updateResult) {
      res.status(200).json({ message: 'Employee contact information updated successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
