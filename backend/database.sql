
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
  '0643679032',
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
  '0698020693',
  '8692',
  'Avenue du Bac', 
  'Champigny-sur-Marne', 
  'user'
);

CREATE TABLE practitioner (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  surname VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO
practitioner (surname)
VALUES
(
  'Dr. Richard'
);

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
  color_theme VARCHAR(7) NOT NULL,
  CONSTRAINT fk_protocol_operation
  FOREIGN KEY (operation_id)
  REFERENCES operation(id)
  ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO
protocol (protocol_name, operation_id, color_theme)
VALUES
(
  'Comprendre mon opération',
  '1',
  '#d9b520'
),
(
  'Dossier administratif',
  '1',
  '#079fa5'
),
(
  'Checklist',
  '1',
  '#c1486c'
),
(
  'Comprendre mon opération',
  '2',
  '#d9b520'
),
(
  'Dossier administratif',
  '2',
  '#079fa5'
),
(
  'Checklist',
  '2',
  '#c1486c'
);

CREATE TABLE intervention (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  operation_id INT NOT NULL,
  CONSTRAINT fk_intervention_operation
  FOREIGN KEY (operation_id)
  REFERENCES operation(id),
  user_id INT NOT NULL,
  CONSTRAINT fk_intervention_user
  FOREIGN KEY (user_id)
  REFERENCES user(id),
  practitioner_id INT NOT NULL,
  CONSTRAINT fk_intervention_practitioner
  FOREIGN KEY (practitioner_id)
  REFERENCES practitioner(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO
intervention (date, operation_id, user_id, practitioner_id)
VALUES
(
'2023/07/28',
'1',
'2',
'1'
);

CREATE TABLE protocol_item (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  protocol_item_name VARCHAR(100) NOT NULL,
  protocol_description TEXT,
  is_complete boolean NOT NULL DEFAULT false,
  protocol_id INT(11) NOT NULL,
  CONSTRAINT fk_protocol_item
  FOREIGN KEY (protocol_id)
  REFERENCES protocol(id)
  ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO
protocol_item (protocol_item_name, protocol_description, protocol_id)
VALUES
(
  'Lien vers une page dédiée aux ligaments croisés',
  'Lire le contenu du lien pour prendre connaissance des informations sur cette opération.',
  '1'
),
(
  'Passeport ou Carte Nationale Identité',
  'Document nécessaire le jour de lintervention',
  '2'
),
(
  'Carte vitale',
  'Document nécessaire le jour de lintervention',
  '2'
),
(
  'Une photo didentité',
  'Document nécessaire le jour de lintervention',
  '2'
),
(
  'Un R.I.B',
  'Document nécessaire le jour de lintervention',
  '2'
),
(
  'Être à jeun',
  'Nécessaire -12h avant lintervention',
  '3'
),
(
  'Être négatif au COVID',
  'Amener le test négatif le jour de lintervention',
  '3'
),
(
  'Avoir pris une douche avec un savon antiseptique (ex: Bétadine)',
  'À faire le jour de lintervention',
  '3'
),
(
  'Lien vers une page dédiée aux ligaments croisés',
  'Lire le contenu du lien pour prendre connaissance des informations sur cette opération',
  '4'
),
(
  'Passeport ou Carte Nationale Identité',
  'Document nécessaire le jour de lintervention',
  '5'
),
(
  'Carte vitale',
  'Document nécessaire le jour de lintervention',
  '5'
),
(
  'Une photo didentité',
  'Document nécessaire le jour de lintervention',
  '5'
),
(
  'Un R.I.B',
  'Document nécessaire le jour de lintervention',
  '5'
),
(
  'Être à jeun',
  'Nécessaire -12h avant lintervention',
  '6'
),
(
  'Être négatif au COVID',
  'Amener le test négatif le jour de lintervention',
  '6'
),
(
  'Avoir pris une douche avec un savon antiseptique (ex: Bétadine)',
  'À faire le jour de lintervention',
  '6'
);

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
