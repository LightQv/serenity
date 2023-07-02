// représente la table

const AbstractManager = require("./AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, hashedPassword, phone_number, address_number, address_streetname, city, roles) VALUES(?,?,?,?,?,?,?,?,?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.phone_number,
        user.address_number,
        user.address_streetname,
        user.city,
        user.roles,
      ]
    );
  }

  findUserById(user) {
    return this.database.query(
      `select firstname, lastname, email, phone_number, address_number, address_streetname, city, roles from  ${this.table} where id = ?`,
      [user.id]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} set firstname = ?, lastname = ?, email = ?, phone_number = ?, address_number = ?, address_streetname = ?, city = ?, roles = ? WHERE id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.phone_number,
        user.address_number,
        user.address_streetname,
        user.city,
        user.roles,
        user.id,
      ]
    );
  }

  findByEmailWithPassword(email) {
    return this.database.query(`SELECT * FROM ${this.table} where email = ?`, [
      email,
    ]);
  }
}

module.exports = userManager;
