// représente la table

const AbstractManager = require("./AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }
}

module.exports = userManager;
