const db = require('../connection');

const getUserByUsername = (username) => {
    return db.query('SELECT * FROM users WHERE name = $1;', [username])
        .then(data => {
            if (data.rows.length === 0) {
                return null;
            }
            return data.rows[0];
        });
};

module.exports = { getUserByUsername };