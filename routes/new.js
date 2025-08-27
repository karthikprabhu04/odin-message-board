const { Router } = require("express");
const { messages, state } = require("./index");
const db = require("../db/queries");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render("form");
});

newRouter.post("/", (req, res) => {
  console.log(req.body);
  // messages.push({ text: messageText, user: messageUser, added: new Date() });
  state.lastId++;
  messages.push({ id: state.lastId, text: req.body.text, user: req.body.name, added: new Date() });
  res.redirect("/")
})

module.exports = newRouter;