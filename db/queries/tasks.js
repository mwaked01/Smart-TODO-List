const db = require('../connection');

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


const getTask = (task_id) => {
  return db.query(
    `SELECT * FROM tasks WHERE id = ${task_id} `)
    .then(data => {
      //console.log('tasks', data.rows)
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    })
};

module.exports = { getTasksInCat, getTask,getTasks, getTasksByCategoryId };
