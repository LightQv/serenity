const models = require("../models");

const browse = (req, res) => {
  models.practitioner
    .findAll()
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};
const read = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.practitioner
    .findByPk(id)
    .then((practitioner) => {
      if (practitioner) {
        res.send(practitioner);
      } else {
        res.status(404).send("Practitioner not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};
const edit = (req, res) => {
  const practitioner = req.body;

  practitioner.id = parseInt(req.params.id, 10);

  models.practitioner
    .update(practitioner)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const add = (req, res) => {
  const newPractitioner = req.body;

  models.practitioner
    .insert(newPractitioner)
    .then(([result]) => {
      res.location(`/practitioners/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const affectedRows = await models.practitioner.delete(id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
module.exports = {
  browse,
  read,
  edit,
  add,
  delete: destroy,
};
