// load .env data into process.env
require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');


const apiKey = process.env.THEMOVIEDB_API_KEY;
let category = null;

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
          category = 'To watch';
        }
      }

      res.json(category);
    } else {
      res.status(500).send('Error');
    }
  });
});


module.exports = router;
