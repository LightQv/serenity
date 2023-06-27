const AbstractManager = require("./AbstractManager");

class InterventionManager extends AbstractManager {
  constructor() {
    super({ table: "intervention" });
  }

  insert(intervention) {
    return this.database.query(
      `INSERT INTO ${this.table} (intervention_name, date, user_id, protocol_id, practitioner_id) VALUES (?, ?, ?, ?, ?)`,
      [
        intervention.intervention_name,
        intervention.date,
        intervention.user_id,
        intervention.protocol_id,
        intervention.practitioner_id,
      ]
    );
  }
}

module.exports = InterventionManager;
