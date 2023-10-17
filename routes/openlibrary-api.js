
const express = require('express');
const router = express.Router();
const request = require('request');
const addTaskQueries = require('../db/queries/add-task');

router.get('/', (req, res) => {
  const word = req.query.word;
  const apiUrl = `https://openlibrary.org/search.json?title=${word}`;

  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let category = 'Not Found';
      const data = (JSON.parse(body));
      if (data.docs.length > 0) {
        if (data.docs[0].title.toLowerCase().split(" ").join("") === word.toLowerCase().split(" ").join("")) {

          category = 'Books';
        }
      } else {
        category = 'Not Found';
      }

      res.json({ word, category });
    } else {
      const errorMessage = 'Error in openLibrary API request';
      res.status(500).json({ word, category: errorMessage});
    }
  });
});

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
