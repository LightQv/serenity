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
      `SELECT i.id, u.id AS user_id, u.firstname, u.lastname, DATE_FORMAT(i.date,"%Y-%m-%d") AS date, p.id AS practitioner_id, p.surname, o.id AS operation_id, o.operation_name FROM ${this.table} AS i 
      JOIN user AS u ON u.id = i.user_id 
      JOIN practitioner AS p ON i.practitioner_id = p.id 
      JOIN operation AS o ON i.operation_id = o.id 
      `
    );
  }

  findInterventionById(id) {
    return this.database.query(
      `SELECT i.id, u.id AS user_id, u.firstname, u.lastname, DATE_FORMAT(i.date,"%Y-%m-%d") AS date, p.id AS practitioner_id, p.surname, o.id AS operation_id, o.operation_name FROM ${this.table} AS i 
      JOIN user AS u ON u.id = i.user_id 
      JOIN practitioner AS p ON i.practitioner_id = p.id 
      JOIN operation AS o ON i.operation_id = o.id where i.id=?
      `,
      [id]
    );
  }

  update(intervention) {
    return this.database.query(
      `UPDATE ${this.table} SET user_id = ?, date = ?, practitioner_id = ?, operation_id = ? 
      WHERE id = ?`,
      [
        intervention.user_id,
        intervention.date,
        intervention.practitioner_id,
        intervention.operation_id,
        intervention.id,
      ]
    );
  }

  delete(intervention) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      intervention,
    ]);
  }

  countInterventions() {
    return this.database.query(`SELECT COUNT(*) AS total FROM ${this.table}`);
  }

  findAllList(limit, offset) {
    return this.database.query(`SELECT * FROM ${this.table} LIMIT ? OFFSET ?`, [
      limit,
      offset,
    ]);
  }
}

module.exports = InterventionManager;
