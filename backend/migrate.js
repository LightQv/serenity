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

  // creation des fake datas user

  const generateRandomusers = (number) => {
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
      const userQuery = `INSERT INTO user (firstname, lastname, email, hashedPassword, phone_number, adress_streetname, city) VALUES ("${firstname}", "${lastname}", "${email}", "${hashedPassword}", "${phoneNumber}", "${adressStreetname}", "${city}" )`;
      // connection à la bdd avec envoi d'une query
      connection.query(userQuery);
    }
  };

  generateRandomusers(20);

  // création des fakes datas practitioner

  const generateRandomPractitioner = (number) => {
    for (let i = 0; i < number; i += 1) {
      const surname = faker.person.lastName();
      const practitionerQuery = `INSERT INTO practitioner (surname) VALUES ("${surname}")`;
      connection.query(practitionerQuery);
    }
  };

  generateRandomPractitioner(10);

  // création des fakes table intervention

  // const generateRandomInterventions = (number) => {
  //   for (let i = 0; i < number; i += 1) {
  //     const dateFaked = faker.date.between({
  //       from: "2020-01-01",
  //       to: "2020-02-01",
  //     });
  //     const dateToInsert = `${dateFaked.getFullYear()}-${dateFaked.getMonth()+1}-${dateFaked.getDate()}`;
  //     const userId = faker.number.int({ min: 1, max: 20 });

  //     const interventionQuery = `INSERT INTO intervention (date, user_id) VALUES ("${dateToInsert}", "${userId}" )`;

  //     connection.query(interventionQuery);
  //   }
  // };

  // generateRandomInterventions(20);
  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
