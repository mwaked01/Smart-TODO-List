const db = require('../connection');

const getTasksInCat = (tasks) => {
  return db.query(
    `SELECT * FROM tasks WHERE category_id = $1 ORDER BY date_created DESC;`,[tasks.category_id]) //hard coded -  ${cat_id} returns nothing?
    .then(data => {
      //console.log('tasks', data.rows)
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message)
    })
};

module.exports = { getTasksInCat };
