const db = require('../connection');

const getTasksInCat = (cat_id) => {
  return db.query(
    `SELECT * FROM tasks WHERE category_id = ${cat_id} ORDER BY date_created DESC;;`) //hard coded -  ${cat_id} returns nothing?
    .then(data => {
      //console.log('tasks', data.rows)
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};

module.exports = { getTasksInCat };
