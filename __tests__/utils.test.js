const { cleanLocoD, mungyBiz, mapArray } = require('../lib/utils.js');
const { data } = require('../data/location-raw.js');
const { Wdata } = require('../data/weather-raw.js');
const { Bdata } = require('../data/businesses-raw.js');

describe('utils', () => {
  // got rid of all the auth test stuff because we no longer have a database
  test('cleanLocoD', async() => {
    const expectation = {
      'latitude': expect.any(String),
      'longitude': expect.any(String),
      'formatted_query': expect.any(String)
    };
    const mungedData = cleanLocoD(data);
    expect(mungedData).toEqual(expectation);
  });
  test('map array returns a forcast based on location data', async() => {
    const expectation = [{
      forecast: expect.any(String),
      time: expect.any(String)
    }];
    const mungedData = mapArray(Wdata[0].data);
    expect(mungedData).toEqual(expect.arrayContaining(expectation));
  });
  test('that mungyBiz will return local businesses based on location data ', async() => {
    const expectation = [{
      name: expect.any(String),
      image_url: expect.any(String),
      price: expect.any(String),
      rating: expect.any(Number),
      url: expect.any(String)
    }];
    const mungedData = mungyBiz(Bdata[0].businesses);
    expect(mungedData).toEqual(expect.arrayContaining(expectation));
  });
});