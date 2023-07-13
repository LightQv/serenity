const models = require("../models");

const browse = (req, res) => {
  models.protocolItem
    .findAll()
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const readByProtocol = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.protocolItem
    .findByProtocol(id)
    .then(([rows]) => {
      if (rows[0]) {
        res.send(rows);
      } else {
        res.status(404).send("Protocol item not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const readDetails = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.protocolItem
    .find(id)
    .then(([rows]) => {
      if (rows[0]) {
        res.send(rows[0]);
      } else {
        res.status(404).send("Protocol item not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const edit = (req, res) => {
  const protocolItem = req.body;

  protocolItem.id = parseInt(req.params.id, 10);

  models.protocolItem
    .update(protocolItem)
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
  const newProtocolItem = req.body;

  models.protocolItem
    .insert(newProtocolItem)
    .then(([result]) => {
      res.location(`/items/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.protocolItem
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
  readByProtocol,
  readDetails,
  edit,
  add,
  destroy,
};
