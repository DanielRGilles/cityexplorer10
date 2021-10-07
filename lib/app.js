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
    const latituded = req.query.latitude;
    const longituded = req.query.longitude;

    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latituded}&lon=${longituded}}&key=${process.env.WEATHER_KEY}`);
       
    const weatherArray = response.body.data.slice(0, 7);
    res.json(weatherArray.map(weather => {
      return { 'forecast': weather.weather.description,
        'time': weather.valid_date }; })
    );
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});
app.get('/reviews', async(req, res) => {
  try {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    
    const response = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`)
      .set({ Authorization: `Bearer ${process.env.REVIEW_KEY}` });

    const busyArr = response.body.businesses;
    const mapBusyArr = busyArr.map(business => {
      return { name: business.name,
        image_url: business.image_url,
        price: business.price,
        rating: business.rating,
        url: business.url };
    });
    res.json(mapBusyArr);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


app.use(require('./middleware/error'));

module.exports = app;
