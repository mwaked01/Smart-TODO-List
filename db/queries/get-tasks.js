const db = require('../connection');

const getTaskById = (id) => {
  const queryInput = `
  SELECT categories.name as category, tasks.id as taskid, title as task, date_created as date
  FROM tasks
  JOIN categories ON categories.id = category_id
  WHERE tasks.id = $1 AND user_id = 1
  ORDER BY date DESC
  ;
  `;
  return db
    .query(queryInput, [id])
    .then(data => {
      return data.rows[0];
    });
};

const getTasksByCategoryName = (catName) => {
  const queryInput = `
  SELECT categories.name as category, tasks.id as taskid, title as task, date_created as date
  FROM tasks
  JOIN categories ON categories.id = category_id
  WHERE categories.name = $1 AND user_id = 1
  ORDER BY date DESC
  ;
  `;
  return db
    .query(queryInput, [catName])
    .then(data => {
      return data.rows;
    });
};

const deleteTaskById = (id) => {
  return db.query('DELETE FROM tasks WHERE id = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

const getCategoryIdByName = (name) => {

  const queryInput = `
  SELECT id
  FROM categories
  WHERE name = $1
  ;
  `;
  return db
    .query(queryInput, [name])
    .then(data => {
      return data.rows[0];
    });
};

const updateTaskById = (taskId, cat_id) => {
  const queryInput = `
  UPDATE tasks SET category_id = $1 WHERE id = $2
  RETURNING *;
  `;
  return db
    .query(queryInput, [cat_id, taskId])
    .then(data => {
      return data.rows[0];
    });
};

const changeTaskName = (taskId, title) => {
  const queryInput = `
  UPDATE tasks SET title = $1 WHERE id = $2
  RETURNING *;
  `;
  return db
    .query(queryInput, [title, taskId])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { changeTaskName,getCategoryIdByName, updateTaskById, getTaskById, getTasksByCategoryName, deleteTaskById };
