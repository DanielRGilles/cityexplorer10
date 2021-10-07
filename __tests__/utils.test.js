const { cleaneLocoD } = require('../lib/utils.js');
const { data } = require('../data/location-raw.js');

describe('utils', () => {
  // got rid of all the auth test stuff because we no longer have a database
  test('cleaneLocoD', async() => {
    const expectation = {
      'latitude': '33.7489924',
      'longitude': '-84.3902644',
      'formatted_query': 'Atlanta, Fulton County, Georgia, USA'
    };
    const mungedData = cleaneLocoD(data);
    expect(mungedData).toEqual(expectation);
  });
});