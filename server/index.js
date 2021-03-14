const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios").default;
const api = "https://covid19.mathdro.id/api/";
const dailyApi = "https://covid19.mathdro.id/api/daily";
const port = process.env.PORT || 4000;
app.use(cors());

app.get("/", function (req, response, next) {
  axios.get(api).then((res) => {
    response.send(res.data);
  });
});

app.listen(port, function () {
  console.log("CORS-enabled web server listening on port localhost:4000");
});
