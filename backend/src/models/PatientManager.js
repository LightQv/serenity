// représente la table

const AbstractManager = require("./AbstractManager");

class PatientManager extends AbstractManager {
  constructor() {
    super({ table: "patient" });
  }

  insert(patient) {
    return this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, hashedPassword, phone_number, adress_streetname, city) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        patient.firstname,
        patient.lastname,
        patient.email,
        patient.hashedPassword,
        patient.phone_number,
        patient.adress_streetname,
        patient.city,
      ]
    );
  }
}

module.exports = PatientManager;
