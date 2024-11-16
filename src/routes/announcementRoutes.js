// src/routes/announcementRoutes.js
const express = require('express');
const router = express.Router();
const announcementService = require('../services/announcementService');

// Route to get all announcements
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await announcementService.getAllAnnouncements();
    if (announcements.length > 0) {
      res.status(200).json(announcements);
    } else {
      res.status(404).json({ message: 'No announcements found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
