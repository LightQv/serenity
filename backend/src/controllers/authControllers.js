const models = require("../models");

const register = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(201);
      else res.sendStatus(400);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getUserByEmailMiddleware = (req, res, next) => {
  const { email } = req.body;

  models.user
    .findByEmailWithPassword(email)
    .then(([users]) => {
      if (users[0]) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  register,
  getUserByEmailMiddleware,
};
