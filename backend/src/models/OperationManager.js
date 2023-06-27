const AbstractManager = require("./AbstractManager");

class OperationManager extends AbstractManager {
  constructor() {
    super({ table: "operation" });
  }

  findWithProtocolName() {
    return this.database.query(
      `SELECT ope.id AS operation_id, ope.operation_name, pro.id AS protocol_id, pro.protocol_name as protocol_name FROM ${this.table} as ope JOIN protocol as pro ON ope.id = pro.operation_id`
    );
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
}

module.exports = OperationManager;
