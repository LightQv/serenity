const AbstractManager = require("./AbstractManager");

class ProtocolManager extends AbstractManager {
  constructor() {
    super({ table: "protocol" });
  }

  findAllWithOperationNameAndItemCount() {
    return this.database.query(
      `SELECT p.id AS protocol_id, p.protocol_name, p.color_theme AS protocol_color, o.id AS operation_id, o.operation_name, COUNT(*) as item_count 
      FROM ${this.table} as p 
      JOIN operation as o ON p.operation_id = o.id
      JOIN protocol_item as item ON item.protocol_id = p.id
      GROUP BY protocol_id ORDER BY protocol_id ASC`
    );
  }

  findWithOperationName(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} AS p JOIN operation ON p.operation_id = operation.id AND p.id = ?`,
      [id]
    );
  }

  insert(protocol) {
    return this.database.query(
      `INSERT INTO ${this.table} (protocol_name, operation_id, color_theme) VALUES(?,?,?)`,
      [protocol.protocol_name, protocol.operation_id, protocol.color_theme]
    );
  }

  update(protocol) {
    return this.database.query(
      `UPDATE ${this.table} set protocol_name = ?, operation_id = ?, color_theme = ? where id = ?`,
      [
        protocol.protocol_name,
        protocol.operation_id,
        protocol.color_theme,
        protocol.id,
      ]
    );
  }
}
module.exports = ProtocolManager;
