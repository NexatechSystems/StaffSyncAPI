// src/services/announcementService.js
const { sql, poolPromise } = require('../config/dbConfig');

async function getAllAnnouncements() {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`
        SELECT announcement_id, subject, message
        FROM Announcements
      `);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = {
  getAllAnnouncements,
};
