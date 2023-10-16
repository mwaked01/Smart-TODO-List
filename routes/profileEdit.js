const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
    userQueries.getUserDataByUsername('Luke')
        .then(userData => {
            res.render('editProfile', { userData });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;