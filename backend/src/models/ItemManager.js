const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "protocol_item" });
  }

  findByProtocol(id) {
    return this.database.query(
      `SELECT item.id as item_id, item.protocol_item_name, item.protocol_description, item.is_complete, item.protocol_id FROM ${this.table} as item WHERE protocol_id = ?`,
      [id]
    );
  }

  insert(protocolItem) {
    return this.database.query(
      `INSERT INTO ${this.table} (protocol_item_name, protocol_description, protocol_id) VALUES(?,?,?)`,
      [
        protocolItem.protocol_item_name,
        protocolItem.protocol_description,
        protocolItem.protocol_id,
      ]
    );
  }

  update(protocolItem) {
    return this.database.query(
      `UPDATE ${this.table} set protocol_item_name = ?, protocol_description = ?, is_complete = ? where id = ?`,
      [
        protocolItem.protocol_item_name,
        protocolItem.protocol_description,
        protocolItem.is_complete,
        protocolItem.id,
      ]
    );
  }
}
module.exports = ItemManager;
