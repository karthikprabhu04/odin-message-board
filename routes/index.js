const { Router } = require("express");

const homeRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const state = { lastId: 2 };

homeRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages })
});

homeRouter.get("/messages/:id", (req, res) => {
  const msgId = parseInt(req.params.id);
  const message = messages.find(m => m.id === msgId);
  if (!message) return res.status(404).send("Message not found");
  res.render("messageDetails", {message});
})

module.exports = {homeRouter, messages, state};