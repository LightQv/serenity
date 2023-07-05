const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "protocol_item" });
  }

  findAllWithProtocolName() {
    return this.database.query(
      `SELECT item.id as item_id, item.protocol_item_name as item_name, item.protocol_description as item_descritpion, item.is_complete as item_complete, p.id as protocol_id, p.protocol_name
      FROM ${this.table} AS item 
      JOIN protocol as p ON item.protocol_id = p.id 
      ORDER BY item_id ASC`
    );
  }

  findWithProtocolName(id) {
    return this.database.query(
      `SELECT item.id as item_id, item.protocol_item_name as item_name, item.protocol_description as item_descritpion, item.is_complete as item_complete, p.id as protocol_id, p.protocol_name
      FROM ${this.table} AS item 
      JOIN protocol as p ON item.protocol_id = p.id 
      WHERE item.id = ?
      ORDER BY item_id ASC`,
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
      `UPDATE ${this.table} set protocol_item_name = ?, protocol_description = ?, is_complete = ?, protocol_id = ? where id = ?`,
      [
        protocolItem.protocol_item_name,
        protocolItem.protocol_description,
        protocolItem.status,
        protocolItem.protocol_id,
        protocolItem.id,
      ]
    );
  }
}
module.exports = ItemManager;
