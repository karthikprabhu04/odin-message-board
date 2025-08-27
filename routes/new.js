const { Router } = require("express");
const { messages } = require("./index");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render("form");
});

newRouter.post("/", (req, res) => {
  console.log(req.body);
  // messages.push({ text: messageText, user: messageUser, added: new Date() });
  messages.push({ text: req.body.text, user: req.body.name, added: new Date() });
  res.redirect("/")
})

module.exports = newRouter;