const { Router } = require("express");

const homeRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

homeRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages })
});

module.exports = {homeRouter, messages};