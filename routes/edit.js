/*
 * All routes for categories are defined here
 * Since this file is loaded in server.js into /categories,
 *   these routes are mounted onto /categories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/:task_id', (req, res) => {
    const task = req.params.cat_id
      console.log('task:', task)
      res.render('edit', { task });
 });

router.put('/:task_id', (req, res) => {
   const queryParams = req.body.task_id;
   const newCat = req.body.category; // grab "value" of radio button
   console.log (queryParams, newCat)
   const queryString = `UPDATE tasks SET category_id = ${newCat} WHERE id = ${queryParams};`;
   db.query(queryString) //, queryParams
    .then((task) => {
      console.log("updated") //deleted ok
      res.redirect("/users"); //go back
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
