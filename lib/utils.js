

function cleanLocoD(body) {
  return {
    latitude: body[0].lat,
    longitude: body[0].lon,
    formatted_query: body[0].display_name
  };
}


module.exports = {
  cleanLocoD
};
