// A dummy backend service for the example app

const express = require('express');
const app = express();
const port = 3000;
const db = require('./queries');
const util = require('./util');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/records', async (req, res) => {
  await  util.refreshRecords();
  res.json("finished");
});

app.get('/top/confirmed', async (req, res) => {

  var observation_date = req.query.observation_date;
  var max_results = req.query.max_results;

  var params = [await formattedDate(new Date(observation_date)), max_results];
  var items = await db.getResult(params);

  var countries = []

  items.forEach((item) => {
    countries.push(
      {
        "country": item['country_region'],
        "confirmed": item.confirmed,
        "deaths": item.deaths,
        "recovered": item.recovered,
      }
    );

  });

  const data = {
    "observation_date": observation_date,
    "countries": countries,
  };
  res.status(200).json(data);
});

async function formattedDate(d = new Date) {
  return [d.getMonth() + 1, d.getDate(), d.getFullYear()]
    .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
}

// Allow connections from all IPs to work for emulators and such
app.listen(port, '0.0.0.0', () => {
  var data = util.refreshRecords(); // Refresh records in DB
  console.log(`App listening at http://localhost:${port}`)
}

);// Add headers

