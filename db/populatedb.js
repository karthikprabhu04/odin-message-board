const { Client } = require("pg");
require('dotenv').config();

const messages = [
  { text: 'Hi there!', username: 'Amando' },
  { text: 'Hello World!', username: 'Charles' }
];

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  added TIMESTAMP NOT NULL
);`

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    await client.query(SQL);

    const { rows } = await client.query("SELECT COUNT(*) FROM messages");
    if (parseInt(rows[0].count) > 0) {
      console.log("Database already seeded, skipping inserts...");
      return;
    }

    for (const msg of messages) {
      await client.query(
        "INSERT INTO messages (text, username, added) VALUES ($1, $2, NOW())",
        [msg.text, msg.username]
      );
    }

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();