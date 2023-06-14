const AbstractManager = require("./AbstractManager");

class InterventionManager extends AbstractManager {
  constructor() {
    super({ table: "intervention" });
  }

  insert(intervention) {
    return this.database.query(
      `INSERT INTO ${this.table} (intervention_name, date, patient_id) VALUES (?, ?, ?)`,
      [
        intervention.intervention_name,
        intervention.date,
        intervention.patient_id,
      ]
    );
  }
}

module.exports = InterventionManager;
