// load .env data into process.env
require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
  const word = req.query.word;
  const apiKey = process.env.YELP_API_KEY;
  const apiUrl = `https://api.yelp.com/v3/businesses/search?location=canada&term=${word}&sort_by=best_match&limit=20`;
  const options = {
    url: apiUrl,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const businessList = data.businesses;
      let category = 'Not Found';

      for (let business of businessList) {
        if (business.name.toLowerCase().split(" ").join("").includes(word.toLowerCase().split(" ").join(""))) {
          category = 'To Eat';
        }
      }

      res.json(category);
    } else {
      const errorMessage = 'Error in Yelp API request';
      res.status(500).send(errorMessage);
    }
  });
});


module.exports = router;
