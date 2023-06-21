const AbstractManager = require("./AbstractManager");

class ProtocolManager extends AbstractManager {
  constructor() {
    super({ table: "protocol" });
  }
}
module.exports = ProtocolManager;
