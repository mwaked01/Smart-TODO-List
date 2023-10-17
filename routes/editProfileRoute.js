const express = require('express');
const app = express();
const userQueries = require('./editProfileQueries');

app.post('/', (req, res) => {
    // Extract data from the form submission
    const newName = req.body.newName;
    const newEmail = req.body.newEmail;
    const newPassword = req.body.newPassword;
    const username = 'Luke';

    // Update the user's information in the database
    userQueries.updateUserProfile(username, newName, newEmail, newPassword)
        .then(() => {
            res.json({ message: 'Profile updated successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.get('/', (req, res) => {
    const username = 'Luke';
    userQueries.getUserDataByUsername(username)
        .then(userData => {
            res.render('/', { userData });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});
