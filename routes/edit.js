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

router.get('/:task', (req, res) => {
  console.log(req.params.task);
  tasksByCat.getTask(req.params.task)
    .then((task) => {
      console.log('task:', task)
      res.render('edit', { task });
     })
    .catch((err) => res.status(500).send(err));
  });

router.post('/', (req, res) => {
   console.log(req.params.task);
   const queryParams = req.body.task;
   const newCat = req.body.category; // grab "value" of radio button
   const queryString = `UPDATE tasks SET category_id = ${newCat} WHERE id = ${queryParams};`;
   console.log (queryString)
   db.query(queryString) //, queryParams
    .then((task) => {
      console.log("updated") //deleted ok
      res.redirect("/users"); //go back
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
