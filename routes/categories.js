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
      console.log('tasks:', tasks);
      res.render('categories', { tasks });
    })
    .catch((err) => res.status(500).send(err));
});


router.post('/:cat_id', (req, res) => {
  const queryParams = req.body.id_name;
  console.log(queryParams) //
  const queryString = `DELETE FROM tasks WHERE id = ${queryParams};`;
  db.query(queryString) //, queryParams
    .then((task) => {
      console.log("deleted") //deleted ok
      res.redirect("/users"); //go back
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
