const { Router } = require("express");
const Bird = require("../models/Bird");

module.exports = Router().post("/", (req, res, next) => {
  Bird.insert(req.body)
    .then((bird) => res.send(bird))
    .catch(next);
});
