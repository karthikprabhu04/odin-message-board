const { Router } = require("express");
const db = require("../db/queries");

const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
  const messages = await db.getMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

homeRouter.get("/messages/:id", async (req, res) => {
  const messages = await db.getMessages();
  const msgId = parseInt(req.params.id);
  const message = messages.find((m) => m.id === msgId);
  if (!message) return res.status(404).send("Message not found");
  res.render("messageDetails", { message });
});

module.exports = { homeRouter };
