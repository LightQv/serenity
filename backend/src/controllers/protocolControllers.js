const models = require("../models");

const browse = (req, res) => {
  models.protocol
    .findAllWithOperationName()
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const read = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.protocol
    .findWithOperationName(id)
    .then(([rows]) => {
      if (rows[0]) {
        res.send(rows[0]);
      } else {
        res.status(404).send("Protocol not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const edit = (req, res) => {
  const protocol = req.body;

  protocol.id = parseInt(req.params.id, 10);

  models.protocol
    .update(protocol)
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
  const newProtocol = req.body;
  console.warn(newProtocol);

  models.protocol
    .insert(newProtocol)
    .then(([result]) => {
      res.location(`/protocols/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.protocol
    .delete(id)
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
  read,
  edit,
  add,
  destroy,
};
