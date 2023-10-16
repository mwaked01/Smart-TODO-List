const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
    userQueries.getUserDataByUsername('Luke') // Replace 'Luke' with the actual username
      .then(userData => {
        res.render('editProfile', { userData }); // Render the 'editProfile' view with user data
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  
  module.exports = router;