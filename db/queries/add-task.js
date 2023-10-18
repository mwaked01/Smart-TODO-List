const db = require('../connection');

const addTask = (task) => {
  const queryInput = `
  INSERT INTO tasks (user_id, category_id, title, date_created)
    VALUES (
    $1, $2, $3, $4)
    RETURNING *;
  `;
  return db
    .query(queryInput, [task.user_id, task.category_id, task.title, task.date_created])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { addTask };
