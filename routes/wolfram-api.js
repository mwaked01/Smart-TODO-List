// load .env data into process.env
require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');

let category = null;

router.get('/', (req, res) => {
  const word = req.query.word;
  const apiId = process.env.WOLFRAM_API_ID;
  const wolframApiUrl = `http://api.wolframalpha.com/v2/query?input=Category+of+${word}&format=plaintext&output=JSON&appid=${apiId}`;

  request(wolframApiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      if (data.queryresult.success === true) {
        category = data.queryresult.datatypes;
        if (category.includes('Food')) {
          category = 'To Eat';
        }
        res.json(category);
      } else {
        category = 'No Category';
        res.json(category);
      }
    } else {
      console.error(error);
      res.status(500).json({ error: 'Wolfram Alpha API request failed.' });
    }
  });

});

module.exports = router;
