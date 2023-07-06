const AbstractManager = require("./AbstractManager");

class InterventionManager extends AbstractManager {
  constructor() {
    super({ table: "intervention" });
  }

  insert(intervention) {
    return this.database.query(
      `INSERT INTO ${this.table} (operation_id, date, user_id, practitioner_id) VALUES (?, ?, ?, ?)`,
      [
        intervention.operation_id,
        intervention.date,
        intervention.user_id,
        intervention.practitioner_id,
      ]
    );
  }

  findIntervention() {
    return this.database.query(
      `SELECT u.id AS user_id, u.firstname, u.lastname, DATE_FORMAT(date, '%d/%m/%Y') AS formatted_date, p.id AS practitioner_id, p.surname, o.id AS operation_id, o.operation_name FROM ${this.table} AS i 
      JOIN user AS u ON u.id = i.user_id 
      JOIN practitioner AS p ON i.practitioner_id = p.id 
      JOIN operation AS o ON i.operation_id = o.id 
      `
    );
  }
}

module.exports = InterventionManager;
