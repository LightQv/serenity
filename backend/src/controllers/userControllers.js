const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const browseList = async (req, res) => {
  const { page } = req.query;
  const { term } = req.query;
  const limit = 12;
  const offset = (page - 1) * limit;

  try {
    if (term) {
      const [[{ total }]] = await models.user.countUsersSearch(term);
      const [users] = await models.user.searchAllList(term, limit, offset);
      res.send({ total, datas: users });
    } else {
      const [[{ total }]] = await models.user.countUsers();
      const [users] = await models.user.findAllList(limit, offset);
      res.send({ total, datas: users });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

const read = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.user
    .find(id)
    .then(([rows]) => {
      if (rows[0]) {
        res.send(rows[0]);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const edit = (req, res) => {
  const user = req.body;

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("User not found");
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
  const newUser = req.body;

  models.user
    .insert(newUser)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.user
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
