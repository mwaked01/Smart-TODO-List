// load .env data into process.env
require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
  const word = req.query.word;
  const apiKey = 'NoB5laO4qGdp3IPyUDV5tm14qrHlsRHjgh__kylIArvF80f0G6MJksh-yuYJFxlx5ETTxN-nfL6Kak9X4_nB9tasQj-oisp2SeuuBnBPZ6d-U0OeihUnrOEWZL8rZXYx';
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

      res.json({word,category});
    } else {
      console.error('Error in Yelp API request:', error);
      res.status(500).json('Error');
    }
  });
});


module.exports = router;
