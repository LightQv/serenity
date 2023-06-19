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
}

module.exports = PractitionerManager;
