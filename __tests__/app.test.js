require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('../lib/app');


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
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast':expect.any(String),
          'time': expect.any(String)
        }];
    

      const data = await fakeRequest(app)
        .get('/weather?latitude=39&longitude=-78')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining(expectation));
    });
    test('returns reviews', async() => {

      const expectation = 
        {
          'name': expect.any(String),
          'image_url': expect.any(String),
          'price': expect.any(String),
          'rating': expect.any(Number),
          'url': expect.any(String),
        };

      const data = await fakeRequest(app)
        .get('/reviews?latitude=38&longitude=-78')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body[0]).toEqual(expectation);
    });
  });
});
