const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  added TIMESTAMP NOT NULL
);

INSERT INTO messages (text, username, added) 
VALUES
  ('Hi there!', 'Amando', NOW()),
  ('Hello World!', 'Charles', NOW());
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();