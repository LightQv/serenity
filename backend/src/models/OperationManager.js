const AbstractManager = require("./AbstractManager");

class OperationManager extends AbstractManager {
  constructor() {
    super({ table: "operation" });
  }

  findWithProtocolInfos(id) {
    return this.database.query(
      `SELECT protocol.id as protocol_id, protocol_name, color_theme, operation_id, operation_name, COUNT(item.id) as item_count, COUNT(case when is_complete then 1 end) as item_complete
      FROM ${this.table} 
      JOIN protocol on operation.id = protocol.operation_id 
      JOIN protocol_item as item on protocol.id = item.protocol_id 
      WHERE operation.id = ?
      GROUP BY protocol_id ORDER BY protocol_id ASC`,
      [id]
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
