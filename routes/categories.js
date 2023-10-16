/*
 * All routes for categories are defined here
 * Since this file is loaded in server.js into /categories,
 *   these routes are mounted onto /categories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  const listTask = (categoryId) => {//get from database
    return db.query(`SELECT * FROM tasks WHERE category_id = $1 ORDER BY date_created;`, [
      categoryId,
    ]);
  };

  router.get("/", (req, res) => {
    Promise.all([
      listTask(1) //hard code for category = 1
    ])
      .then((data) => {
        const tasks = data;//get data from database to pass it to render the page
        const templateVars = {
          tasks: tasks.rows,
        };
        res.render("categories", templateVars);
      })
      .catch((err) => res.status(500).send(err));
  });

//  router.post('/edit', (req, res) =>

  router.post('/delete', (req, res) => {
    db.query(
      `DELETE FROM tasks
        WHERE id = $1;`,
      [req.body.task_id]
    )
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => console.log(err.massage));
  });

  return router;
};
//module.exports = router;
