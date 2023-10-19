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

module.exports = { getTasks, getTasksByCategoryId };
