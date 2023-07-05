const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "protocol_item" });
  }

  findByProtocol(id) {
    return this.database.query(
      `SELECT * FROM protocol_item WHERE protocol_id = ?`,
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
      `UPDATE ${this.table} set protocol_item_name = ?, protocol_description = ? where id = ?`,
      [
        protocolItem.protocol_item_name,
        protocolItem.protocol_description,
        protocolItem.id,
      ]
    );
  }
}
module.exports = ItemManager;
