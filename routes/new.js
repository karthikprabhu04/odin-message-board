const { Router } = require("express");
const db = require("../db/queries");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render("form");
});

newRouter.post("/", (req, res) => {
  console.log(req.body);
  db.addMessage({ text: req.body.text, user: req.body.name, added: new Date() });
  res.redirect("/")
})

module.exports = newRouter;