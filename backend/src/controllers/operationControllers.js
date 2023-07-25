const models = require("../models");

const browse = (req, res) => {
  models.operation
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseList = async (req, res) => {
  const { page } = req.query;
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    const [[{ total }]] = await models.operation.countOperations();

    const [operations] = await models.operation.findAllList(limit, offset);
    res.send({ total, datas: operations });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

const read = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.operation
    .find(id)
    .then(([rows]) => {
      if (rows[0]) {
        res.send(rows[0]);
      } else {
        res.status(404).send("Operation not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readWithProtocols = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.operation
    .findWithProtocolInfos(id)
    .then(([rows]) => {
      if (rows[0]) {
        res.send(rows);
      } else {
        res.status(404).send("Operation not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const operation = req.body;
  operation.id = parseInt(req.params.id, 10);

  models.operation
    .update(operation)
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
  const newOperation = req.body;

  models.operation
    .insert(newOperation)
    .then(([result]) => {
      res.location(`/operations/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.operation
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
  browseList,
  read,
  readWithProtocols,
  edit,
  add,
  destroy,
};
