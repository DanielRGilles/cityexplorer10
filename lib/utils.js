function cleanLocoD(body) {
  return {
    latitude: body[0].lat,
    longitude: body[0].lon,
    formatted_query: body[0].display_name
  };
}
function cleanWeather(body) {
  return {
    forecast: body[0].weather.description,
    time: body[0].valid_date,
    
  };
}
module.exports = {
  cleanLocoD,
  cleanWeather
};
