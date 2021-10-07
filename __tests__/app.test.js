require('dotenv').config();

// const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
// const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    test('returns location', async() => {

      const expectation = 
      {
        'formatted_query': expect.any(String),
        'latitude': expect.any(String),
        'longitude': expect.any(String)
      }
    ;

      const data = await fakeRequest(app)
        .get('/location')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
    test('returns weather', async() => {

      const expectation = [
        {
          'forecast': 'Partly cloudy until afternoon.',
          'time': 'Tuesday, June 29, 2021'
        },
        {
          'forecast':'Mostly cloudy in the morning.',
          'time': 'Wednesday, June 30, 2021'
        }];
    

      const data = await fakeRequest(app)
        .get('/weather')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
    test('returns reviews', async() => {

      const expectation = [
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
        }];

      const data = await fakeRequest(app)
        .get('/reviews')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });
});
