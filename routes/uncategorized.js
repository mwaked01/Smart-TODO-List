
const express = require('express');
const router = express.Router();
const addTaskQueries = require('../db/queries/add-task');

router.post("/", (req, res) => {

  const word = req.body.word;
  const category = req.body.category;
  const user_id = 1;

  const newTask = {
    user_id,
    category_id: category,
    title: word,
    date_created: new Date()
  };

  addTaskQueries
    .addTask(newTask)
    .then((task) => {
      res.send(task);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});


module.exports = router;
