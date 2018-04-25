const fetch = require('node-fetch');

// TODO: read from config file?
const apikey = '06c50ffe970c6fb4ae8abcdf4c5709d6';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

function weatherData(query) {
  const url = `${baseURL}?q=${query}&units=metric&lang=fi&APPID=${apikey}`;

  const weather = fetch(url).then(res => res.json()).catch(err => err);
  return weather;
}

/*
  example data
{ coord: { lon: 25.5, lat: 65 },
  weather:
   [ { id: 802,
       main: 'Clouds',
       description: 'ajoittaisia pilviä',
       icon: '03n' } ],
  base: 'stations',
  main: { temp: 2, pressure: 997, humidity: 100, temp_min: 2, temp_max: 2 },
  visibility: 10000,
  wind: { speed: 3.1, deg: 210 },
  clouds: { all: 44 },
  dt: 1509812400,
  sys:
   { type: 1,
     id: 5036,
     message: 0.0022,
     country: 'FI',
     sunrise: 1509776354,
     sunset: 1509802968 },
  id: 643493,
  name: 'Oulu',
  cod: 200 }
*/
function answer(weather) {
  const city = weather.name;
  const countrycode = weather.sys.country;
  const description = weather.weather[0].description;
  const temp = weather.main.temp;
  const windSpeed = weather.wind.speed;
  const pressure = weather.main.pressure;
  const humidity = weather.main.humidity;
  const long = weather.coord.lon;
  const lat = weather.coord.lat;

  const longStr = Math.abs(long) + (long < 0 ? ' W' : ' E');
  const latStr = Math.abs(lat) + (lat < 0 ? ' S' : ' N');

  const resultString = `[${city}, ${countrycode} ${latStr}, ${longStr}] ${temp} °C, ${description}, tuulta ${windSpeed} m/s, ilmanpaine ${pressure} hPa, kosteus ${humidity} %`;

  return resultString;
}

async function handleMessage(msg, replyFn) {
  const regex = /(?:!sää|!weather)[ ]?(.*)/gi;
  const matches = regex.exec(msg);

  if (matches) {
    const query = matches[1] ? matches[1] : 'Oulu';
    const weather = await weatherData(query);
    const answerStr = answer(weather);
    replyFn(answerStr);
  }
}

/*
module.exports = {
    weatherData,
    answer
};
*/

module.exports = {
  name: 'weather',
  handle: handleMessage,
};
