const AbstractManager = require("./AbstractManager");

class ProtocolManager extends AbstractManager {
  constructor() {
    super({ table: "protocol" });
  }

  findAllWithOperationName() {
    return this.database.query(
      `SELECT p.id AS protocol_id, p.protocol_name, o.id AS operation_id, o.operation_name FROM ${this.table} as p JOIN operation as o ON p.operation_id = o.id`
    );
  }

  findWithOperationName(id) {
    return this.database.query(
      `SELECT * FROM  ${this.table} AS p JOIN operation ON p.operation_id = operation.id AND p.id = ?`,
      [id]
    );
  }

  insert(protocol) {
    return this.database.query(
      `INSERT INTO ${this.table} (protocol_name, operation_id) VALUES(?,?)`,
      [protocol.protocol_name, protocol.operation_id]
    );
  }

  update(protocol) {
    return this.database.query(
      `UPDATE ${this.table} set protocol_name = ?, operation_id = ? where id = ?`,
      [protocol.protocol_name, protocol.operation_id, protocol.id]
    );
  }
}
module.exports = ProtocolManager;
