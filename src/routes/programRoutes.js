// src/routes/programRoutes.js
const express = require('express');
const router = express.Router();
const programService = require('../services/programService');

// Route to get all programs for a specific employee email
router.get('/programs/:email', async (req, res) => {
  const employeeEmail = req.params.email;

  try {
    const programs = await programService.getProgramsByEmployeeEmail(employeeEmail);
    if (programs.length > 0) {
      res.status(200).json(programs);
    } else {
      res.status(404).json({ message: 'No programs found for this employee' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
