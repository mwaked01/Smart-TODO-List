// load .env data into process.env
require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/', (req, res) => {
  const word = req.query.word;
  const apiId = process.env.EDAMAM_API_ID;
  const apiKey = process.env.EDAMAM_API_KEY;
  const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&app_id=${apiId}&app_key=${apiKey}&ingr=${word}`;

  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const foodList = data.parsed;
      let category = 'Not Found';

      for (let food of foodList) {
        if (food.food) {
          category = 'To Buy';
        }
      }

      res.json(category);
    } else {
      const errorMessage = 'Error in Edamam API request';
      res.status(500).send(errorMessage);
    }
  });
});


module.exports = router;
