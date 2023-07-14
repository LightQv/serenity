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

  find(id) {
    return this.database.query(
      `select id, firstname, lastname, email, phone_number, address_number, address_streetname, city, roles from ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `select id, firstname, lastname, email, phone_number, address_number, address_streetname, city, roles from  ${this.table}`
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
    return this.database.query(
      `SELECT user.id as user_id, user.firstname as user_firstname, user.lastname as user_lastname, user.email, user.hashedPassword, user.roles, 
    intervention.id as intervention_id, intervention.date as intervention_date,
    operation.id as operation_id, operation.operation_name, 
    practitioner.surname as practitioner_surname 
    FROM ${this.table}
    LEFT JOIN intervention on intervention.user_id = user.id 
    LEFT JOIN operation on operation.id = intervention.operation_id
    LEFT JOIN practitioner on practitioner.id = intervention.practitioner_id
    where user.email = ?`,
      [email]
    );
  }

  search(term) {
    return this.database.query(
      `SELECT id, firstname, lastname, email, phone_number, address_number, address_streetname, city, roles FROM ${this.table} WHERE LOWER(firstname) LIKE LOWER(?) OR LOWER(lastname) LIKE LOWER(?)`,
      [`%${term}%`, `%${term}%`]
    );
  }

  countPatients() {
    return this.database.query(`SELECT COUNT(*) AS total FROM ${this.table}`);
  }

  findAllList(limit, offset) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE roles <> 'admin' LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  }
}

module.exports = userManager;
