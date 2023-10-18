const db = require('../connection');

const getUserDataByUsername = (username) => {
    return db.query('SELECT name, email, password FROM users WHERE name = $1;', [username])
        .then(result => {
            if (result.rows.length === 0) {
                return null;
            }
            return result.rows[0];
        });
};

const updateUserProfile = (username, newName, newEmail, newPassword) => {
    return db.query('UPDATE users SET name = $2, email = $3, password = $4 WHERE name = $1;', [username, newName, newEmail, newPassword]);
};

module.exports = {
    getUserDataByUsername,
    updateUserProfile,
};