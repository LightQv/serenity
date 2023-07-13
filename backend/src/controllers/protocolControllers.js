const models = require("../models");

const browse = (req, res) => {
  models.protocol
    .findAllWithOperationNameAndItemCount()
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
    const [[{ total }]] = await models.protocol.countProtocols();
    const [protocols] = await models.protocol.findAllList(limit, offset);

    res.send({ total, data: protocols });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
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

  models.protocol
    .insert(newProtocol)
    .then(([result]) => {
      res
        .location(`/protocols/${result.insertId}`)
        .json({ id: result.insertId });
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
  browseList,
  read,
  edit,
  add,
  destroy,
};
