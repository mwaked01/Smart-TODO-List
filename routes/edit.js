const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { changeTaskName, getTaskById, updateTaskById, getCategoryIdByName } = require("../db/queries/get-tasks");
const { getInfo } = require('../db/queries/user-info');

router.get('/:task_id', (req, res) => {

  const taskId = parseInt(req.params.task_id);
  const tasksByid = getTaskById(taskId);
  const userInfo = getInfo();

  Promise.all([tasksByid, userInfo])
    .then(([task, info]) => {
      const categoriesLeft = ["Films", "Restaurants", "Books", "Products", "Other"];
      const index = categoriesLeft.indexOf(task.category);
      if (index !== -1) {
        categoriesLeft.splice(index, 1);
      }
      const selectedOption = task.category;
      const templateVars = { task, task_id: taskId, selectedOption, categoriesLeft, info };
      res.render("edit", templateVars);
    })
    .catch((err) => {
      // Handle any errors here
      res.status(500).json({ error: err.message });
    });

});

router.post('/:task_id', (req, res) => {
  const catName = req.body.options;
  const newName = req.body.myInput;
  console.log(newName);
  const taskId = req.params.task_id;
  getCategoryIdByName(catName)
    .then((catId) => {
      updateTaskById(parseInt(taskId), catId.id);
    })
    .then((catId) => {
      changeTaskName(parseInt(taskId), newName);
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
