// load .env data into process.env
require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');
const addTaskQueries = require('../db/queries/add-task');

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
          category = 'Products';
        }
      }

      res.json({word,category});
    } else {
      const errorMessage = 'Error in Edamam API request';
      res.status(500).json({ word, category: 'Error' });
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
