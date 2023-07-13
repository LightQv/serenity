const models = require("../models");

const browse = (req, res) => {
  models.intervention
    .findIntervention()
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const browseList = async (req, res) => {
  const { page } = req.query;
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    const [[{ total }]] = await models.intervention.countInterventions();

    const [interventions] = await models.intervention.findAllList(
      limit,
      offset
    );
    res.send({ total, datas: interventions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

const read = (req, res) => {
  models.intervention
    .findInterventionById(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const intervention = req.body;

  intervention.id = parseInt(req.params.id, 10);

  models.intervention
    .update(intervention)
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
  const intervention = req.body;

  models.intervention
    .insert(intervention)
    .then(([result]) => {
      res.location(`/interventions/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.intervention
    .delete(req.params.id)
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

module.exports = {
  browse,
  browseList,
  read,
  edit,
  add,
  destroy,
};
