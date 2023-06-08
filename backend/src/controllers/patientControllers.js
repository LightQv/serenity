const models = require("../models");

const browse = (req, res) => {
  models.patient
    .findAll()
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal error");
    });
};

module.exports = {
  browse,
};
