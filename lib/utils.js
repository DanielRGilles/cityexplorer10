function cleanLocoD(body) {
  return {
    latitude: body[0].lat,
    longitude: body[0].lon,
    formatted_query: body[0].display_name
  };
}
function mungyBiz(busyArr) {
  return busyArr.map(business => {
    return {
      name: business.name,
      image_url: business.image_url,
      price: business.price,
      rating: business.rating,
      url: business.url
    };
  });
}

function mapArray(days) {
  const mapped = days.map(day => {
    return {
      forecast: day.weather.description,
      time: day.valid_date
    };
  });
  return mapped;
}

module.exports = {
  cleanLocoD,
  mapArray,
  mungyBiz
};
