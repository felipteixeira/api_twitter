const express = require("express");
const axios = require("axios");
const cors = require("cors");
require('dotenv/config');

const token = process.env.TOKEN

const app = express();

app.use(express.json());
app.use(cors());


app.get("/tweet", (request, response) => {
  return axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(`#${request.query.hashtag}`)}&max_results=20&expansions=author_id&user.fields=public_metrics`,
    { headers: { Authorization: token } }
  ).then(result => {
    response.status(200).send(result.data)
  }).catch((err) => {
    console.error(err)
  });
});

module.exports = app;
