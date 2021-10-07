const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const request = require('superagent');
const { cleanLocoD } = require('./utils.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging



app.get('/location', async(req, res) => {
  try {
    const locationed = req.query.search;
   
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${locationed}&format=json`);
    const cleanedUp = cleanLocoD(response.body);
   
    res.json(cleanedUp);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
     
    res.json([
      {
        'forecast': 'Partly cloudy until afternoon.',
        'time': 'Tuesday, June 29, 2021'
      },
      {
        'forecast': 'Mostly cloudy in the morning.',
        'time': 'Wednesday, June 30, 2021'
      }
      
    ]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
app.get('/reviews', async(req, res) => {
  try {
     
    res.json([
      {
        'name': 'Pike Place Chowder',
        'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg',
        'price': '$$   ',
        'rating': '4.5',
        'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
      },
      {
        'name': 'Umi Sake House',
        'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/c-XwgpadB530bjPUAL7oFw/o.jpg',
        'price': '$$   ',
        'rating': '4.0',
        'url': 'https://www.yelp.com/biz/umi-sake-house-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
      }
    ]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


app.use(require('./middleware/error'));

module.exports = app;
