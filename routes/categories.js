const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getInfo }  = require('../db/queries/user-info');
const { deleteTaskById, getTasksByCategoryName } = require("../db/queries/get-tasks");

router.get("/:cat_id", (req, res) => {
  const catId = req.params.cat_id;

  const tasksByCategory = getTasksByCategoryName(catId);
  const userInfo = getInfo();

  Promise.all([tasksByCategory, userInfo])
    .then(([tasks, info]) => {
      const templateVars = { tasks, cat_id: catId, info };
      res.render("categories", templateVars);
    })
    .catch((err) => {
      // Handle any errors here
      res.status(500).json({ error: err.message });
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
