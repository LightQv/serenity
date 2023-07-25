const AbstractManager = require("./AbstractManager");

class OperationManager extends AbstractManager {
  constructor() {
    super({ table: "operation" });
  }

  insert(operation) {
    return this.database.query(
      `INSERT INTO ${this.table} (operation_name) VALUES (?)`,
      [operation.operation_name]
    );
  }

  update(operation) {
    return this.database.query(
      `UPDATE ${this.table} set operation_name = ? where id = ?`,
      [operation.operation_name, operation.id]
    );
  }

  countOperations() {
    return this.database.query(`SELECT COUNT(*) AS total FROM ${this.table}`);
  }

  findAllList(limit, offset) {
    return this.database.query(`SELECT * FROM ${this.table} LIMIT ? OFFSET ?`, [
      limit,
      offset,
    ]);
  }
}

module.exports = OperationManager;
