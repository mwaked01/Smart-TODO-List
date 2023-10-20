const db = require("../connection");



const getTasks = () => {
  return db.query('SELECT * FROM tasks;')
    .then(data => {
      return data.rows;
    });
};
const getTasksByCategoryId = (id) => {
  return db.query('SELECT * FROM tasks WHERE category_id = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

// module.exports = { getTasks, getTasksByCategoryId, get};
// changed:
const getTasksInCat = (cat_id) => {
  return db
    .query(
      `SELECT * FROM tasks WHERE category_id = ${cat_id} ORDER BY date_created DESC;`
    ) //
    .then((data) => {
      //console.log('tasks', data.rows)
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
//changed:
const getTask = (task_id) => {
  return db
    .query(`SELECT * FROM tasks WHERE id = ${task_id} `)
    .then((data) => {
      //console.log('tasks', data.rows)
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getTasksInCat, getTask, getTasks, getTasksByCategoryId };
