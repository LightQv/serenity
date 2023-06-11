require("dotenv").config();

// extrait la valeur de la propriété fakerFR (fakerFRANCE) du module @faker-js/faker dans la variable faker
const { fakerFR: faker } = require("@faker-js/faker");

const fs = require("fs");
const mysql = require("mysql2/promise");

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(`drop database if exists ${DB_NAME}`);
  await connection.query(`create database ${DB_NAME}`);
  await connection.query(`use ${DB_NAME}`);

  const sql = fs.readFileSync("./database.sql", "utf8");

  await connection.query(sql);

  // creation des fake datas patient
  const generateRandomPatients = (number) => {
    for (let i = 0; i < number; i += 1) {
      const firstname = faker.person.firstName();
      const lastname = faker.person.lastName();
      const email = faker.internet
        .email({ firstName: firstname, lastName: lastname })
        .toLowerCase();
      const hashedPassword = faker.internet.password();
      const phoneNumber = faker.phone.number("06-##-##-##-##");
      const adressStreetname = faker.location.streetAddress();
      const city = faker.location.city();
      // requête sql qui remplace les valeurs par celles qui ont été crées ci dessus
      const patientQuery = `INSERT INTO patient (firstname, lastname, email, hashedPassword, phone_number, adress_number, adress_streetname, city, mental_score) VALUES ("${firstname}", "${lastname}", "${email}", "${hashedPassword}", "${phoneNumber}", "${adressStreetname}", "${city}" )`;
      // connection à la bdd avec envoi d'une query
      connection.query(patientQuery);
    }
  };

  generateRandomPatients(20);
  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
