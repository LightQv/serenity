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

  findWithOperationNameAndProtocolItemList(id) {
    return this.database.query(
      `SELECT p.id as protocol_id, p.protocol_name, p_item.id as item_id, p_item.protocol_item_name as item_name, p_item.protocol_description as item_description, ope.id as operation_id, ope.operation_name as ope_name FROM ${this.table} AS p JOIN protocol_item AS p_item ON p.id = p_item.protocol_id JOIN operation as ope ON p.operation_id = ope.id WHERE p.id = ?`,
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
