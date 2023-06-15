const AbstractManager = require("./AbstractManager");

class PractitionerManager extends AbstractManager {
  constructor() {
    super({ table: "practitioner" });
  }
}

module.exports = PractitionerManager;
