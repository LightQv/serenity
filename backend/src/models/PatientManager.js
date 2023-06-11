// représente la table

const AbstractManager = require("./AbstractManager");

class PatientManager extends AbstractManager {
  constructor() {
    super({ table: "patient" });
  }
}

module.exports = PatientManager;
