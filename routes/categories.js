/*
 * All routes for categories are defined here
 * Since this file is loaded in server.js into /categories,
 *   these routes are mounted onto /categories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const tasksByCat = require("../db/queries/tasks");
//

router.get("/:cat_id", (req, res) => {
  tasksByCat.getTasksInCat(req.params.cat_id)
    .then((tasks) => {
      console.log('tasks:', tasks)
      res.render('categories', { tasks });
    })
    .catch((err) => res.status(500).send(err));
});

///TO BE DONE - edit
router.post('/:task_id/edit', (req, res) => {
  const title = req.body.title;
  const newCatId = req.body.category_id;
});

router.post('/:task_id/delete', (req, res) => {
  db.query(
    `DELETE FROM tasks
      WHERE id = $1;`,
    [req.body.task_id]
  )
    .then((data) => {
      res.json({ data });
      res.redirect("/:cat_id");
    })
    .catch((err) => console.log(err.massage));
});

module.exports = router;
