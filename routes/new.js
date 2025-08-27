const { Router } = require("express");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const newRouter = Router();

const validateUser = [
  body("name").trim()
    .isAlpha().withMessage("Name must only contain letters"),
  body("text").trim()
    .isAlpha().withMessage("Text must only contain letters"),
];

newRouter.get("/", (req, res) => {
  res.render("form");
});

newRouter.post("/", [validateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      errors: errors.array(),
    })
  }
  db.addMessage({ text: req.body.text, user: req.body.name, added: new Date() });
  res.redirect("/")}]
);

module.exports = newRouter;