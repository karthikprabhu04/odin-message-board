const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function addMessage(message) {
  await pool.query("INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)", [message.text, message.user, message.added]);
}

module.exports = {
  getMessages,
  addMessage
};
