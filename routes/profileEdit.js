const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
    const username = 'Luke'; // Replace with the actual username
  
    const query = 'SELECT name, email, password FROM user_profile WHERE username = $1';
    const values = [username];
  
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      if (result.rows.length === 0) {
        res.status(404).send('User not found');
      } else {
        const userData = result.rows[0];
        res.render('editProfile', { userData }); // Render the 'editProfile' view with user data
      }
    });
});
