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
      return data.rows;
    });
};

const updateInfo = (info) => {
  const queryInput = `
  UPDATE users SET name = $1, email = $2, password = $3
  WHERE id = 1;
  `;
  return db
    .query(queryInput, [info.name, info.email, info.password])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getInfo,updateInfo };
