const db = require('../connection');

const getUsers = () => {
  const queryInput = `
  SELECT users.name as user, categories.name as category, title as task, date_created as date
  FROM users
  JOIN tasks ON users.id = user_id
  JOIN categories ON categories.id = category_id
  WHERE users.id = 1
  ORDER BY date DESC
  ;
  `;
  return db
  .query(queryInput)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
