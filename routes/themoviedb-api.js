// load .env data into process.env
require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');
const addTaskQueries = require('../db/queries/add-task');

const apiKey = process.env.THEMOVIEDB_API_KEY;

router.get('/', (req, res) => {
  const word = req.query.word;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${word}&sort_by=popularity.desc`;

  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const moviesList = data.results;
      let category = 'Not Found';

      for (let movie of moviesList) {
        if (movie.title.toLowerCase().split(" ").join("").includes(word.toLowerCase().split(" ").join(""))) {
          category = 'Films';
        }
      }

      res.json({word,category});
    } else {
      res.status(500).json('Error');
    }
  });
});

router.post("/", (req, res) => {
  // const userId = req.session.userId;
  // if (!userId) {
  //   return res.send({ error: "error" });
  // }

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
