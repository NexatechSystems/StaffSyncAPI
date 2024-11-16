// src/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveService = require('../services/leaveService');

// Route to add a new leave record
router.post('/leave', async (req, res) => {
  const { employee_email, leave_type, start_date, end_date, information, approved } = req.body;

  try {
    const rowsAffected = await leaveService.addLeaveRecord(employee_email, leave_type, start_date, end_date, information, approved);
    if (rowsAffected > 0) {
      res.status(201).json({ message: 'Leave record added successfully' });
    } else {
      res.status(400).json({ message: 'Failed to add leave record' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
