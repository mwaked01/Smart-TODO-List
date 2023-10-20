/*
 * All routes for categories are defined here
 * Since this file is loaded in server.js into /categories,
 *   these routes are mounted onto /categories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { deleteTaskById, getTasksByCategoryName } = require("../db/queries/get-tasks");

router.get("/:cat_id", (req, res) => {
  const catId = req.params.cat_id;

  getTasksByCategoryName(catId)
    .then((tasks) => {
      const templateVars = { tasks, cat_id: catId };
      res.render("categories", templateVars);
    });
});


router.post('/:task_id/delete', (req, res) => {
   const taskId = req.params.task_id
    deleteTaskById(taskId)
    .then(() => {
      res.redirect("back"); //go back
    });

});

module.exports = router;
