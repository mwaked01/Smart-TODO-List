const db = require('../connection');

const getInfo = () => {
  const queryInput = `
  SELECT name, email, password
  FROM users
  WHERE users.id = 1
  ;
  `;
  return db
    .query(queryInput)
    .then(data => {
      return data.rows[0];
    });
};

const updateInfo = (info) => {
  const queryInput = `
  UPDATE users SET name = $2, email = $3, password = $4
  WHERE id = $1;
  `;
  return db
    .query(queryInput, [1, info.name, info.email, info.password])
    .then(data => {
      return data.rows [0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getInfo, updateInfo };
