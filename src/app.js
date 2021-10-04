const express = require("express");
const axios = require("axios");
const cors = require("cors");
require('dotenv/config');

const token = 'Bearer AAAAAAAAAAAAAAAAAAAAADNnNgEAAAAAsZyhS8O9r2Ea1zr8TCWIcDxIzXw%3DasXSU3q8zV8T4pz65sfFdv6WoOdD3ZlpCiax4LxyYCRe1YzgRN'

const app = express();

app.use(express.json());
app.use(cors());


app.get("/tweet", (request, response) => {
  return axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(`#${request.query.hashtag}`)}&max_results=14&expansions=author_id&user.fields=public_metrics,profile_image_url`,
    { headers: { Authorization: token } }
  ).then(result => {
    response.status(200).send(result.data)
  }).catch((err) => {
    console.error(err)
  });
});

app.get('/status', (req, res) => res.send({}).status(200))

module.exports = app;
