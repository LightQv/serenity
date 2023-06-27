
CREATE TABLE user (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  phone_number TEXT,
  address_number TEXT,
  address_streetname VARCHAR(255),
  city VARCHAR(100),
  roles VARCHAR(100)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO
user (firstname, lastname, email, hashedPassword, phone_number, address_number, address_streetname, city, roles)
VALUES
(
  'Marie',
  'Dutronc',
  'marie.dutronc@gmail.com',
  '$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A',
  '06 43 67 90 32',
  '140',
  'Rue Montesquieu',
  'Lyon',
  'admin'
),
(
  'Jocelyne', 
  'Muller', 
  'jocelyne_muller26@hotmail.fr', 
  '$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A', 
  '06 98 02 06 93',
  '8692',
  'Avenue du Bac', 
  'Champigny-sur-Marne', 
  'user'
);

CREATE TABLE practitioner (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  surname VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE operation (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  operation_name VARCHAR(100) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO
operation (operation_name)
VALUES
(
  'Ligaments croisés antérieurs'
),
(
  'Canal carpien'
);

CREATE TABLE protocol (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  protocol_name VARCHAR(100) NOT NULL,
  operation_id INT(11) NOT NULL,
  CONSTRAINT fk_protocol_operation
  FOREIGN KEY (operation_id)
  REFERENCES operation(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO
protocol (protocol_name, operation_id)
VALUES
(
  'Comprendre mon opération',
  '1'
),
(
  'Dossier administratif',
  '1'
),
(
  'Checklist',
  '1'
),
(
  'Comprendre mon opération',
  '2'
),
(
  'Dossier administratif',
  '2'
),
(
  'Checklist',
  '2'
);

CREATE TABLE intervention (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  intervention_name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_intervention_user
  FOREIGN KEY (user_id)
  REFERENCES user(id),
  protocol_id INT(11) NOT NULL,
  CONSTRAINT fk_intervention_protocol
  FOREIGN KEY (protocol_id)
  REFERENCES protocol(id),
  practitioner_id INT NOT NULL,
  CONSTRAINT fk_intervention_practitioner
  FOREIGN KEY (practitioner_id)
  REFERENCES practitioner(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE protocol_item (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  protocol_item_name VARCHAR(100) NOT NULL,
  protocol_description TEXT,
  image_uri VARCHAR(255) NULL,
  protocol_id INT(11) NOT NULL,
  CONSTRAINT fk_protocol_item
  FOREIGN KEY (protocol_id)
  REFERENCES protocol(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE preparing (
  protocol_item_id INT NOT NULL,
  CONSTRAINT fk_preparing_protocol_item
  FOREIGN KEY (protocol_item_id)
  REFERENCES protocol_item(id),
  intervention_id INT(11) NOT NULL,
  CONSTRAINT fk_preparing_intervention
  FOREIGN KEY (intervention_id)
  REFERENCES intervention(id),
  preparing_state INT
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE programming (
  operation_id INT NOT NULL,
  CONSTRAINT fk_programming_operation
  FOREIGN KEY (operation_id)
  REFERENCES operation(id),
  intervention_id INT,
  CONSTRAINT fk_programming_intervention
  FOREIGN KEY (intervention_id)
  REFERENCES intervention(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
