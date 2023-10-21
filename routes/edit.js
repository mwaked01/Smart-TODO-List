/*
 * All routes for categories are defined here
 * Since this file is loaded in server.js into /categories,
 *   these routes are mounted onto /categories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { changeTaskName, getTaskById, updateTaskById, getCategoryIdByName } = require("../db/queries/get-tasks");

router.get('/:task_id', (req, res) => {

  const taskId = parseInt(req.params.task_id);

  getTaskById(taskId)
    .then((task) => {
      const categoriesLeft = ["Films", "Restaurants", "Books", "Products", "Other"];
      const index = categoriesLeft.indexOf(task.category);
      if (index !== -1) {
        categoriesLeft.splice(index, 1);
      }
      const selectedOption = task.category;
      const templateVars = { task, task_id: taskId, selectedOption, categoriesLeft };
      res.render("edit", templateVars);
    });

});

router.post('/:task_id', (req, res) => {
  const catName = req.body.options;
  const newName = req.body.myInput;
  console.log (newName);
  const taskId = req.params.task_id;
  getCategoryIdByName(catName)
    .then((catId) => {
      updateTaskById(parseInt(taskId),catId.id);
    })
    .then((catId) => {
      changeTaskName(parseInt(taskId),newName);
    })
    .then(() => {
      res.redirect("back");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });

});

module.exports = router;
