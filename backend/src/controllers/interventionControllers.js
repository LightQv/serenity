const models = require("../models");

const browse = (req, res) => {
  models.intervention
    .findAll()
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

module.exports = {
  browse,
};
