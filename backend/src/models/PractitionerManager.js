const AbstractManager = require("./AbstractManager");

class PractitionerManager extends AbstractManager {
  constructor() {
    super({ table: "practitioner" });
  }

  insert(practitioner) {
    return this.database.query(
      `INSERT INTO ${this.table} (surname) VALUES (?)`,
      [practitioner.surname]
    );
  }

  update(practitioner) {
    return this.database.query(
      `UPDATE ${this.table} set surname = ? where id = ?`,
      [practitioner.surname, practitioner.id]
    );
  }

  delete(practitioner) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [
      practitioner,
    ]);
  }

  countPractitioners() {
    return this.database.query(`SELECT COUNT(*) AS total FROM ${this.table}`);
  }

  findAllList(limit, offset) {
    return this.database.query(`SELECT * FROM ${this.table} LIMIT ? OFFSET ?`, [
      limit,
      offset,
    ]);
  }
}

module.exports = PractitionerManager;
