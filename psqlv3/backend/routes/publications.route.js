const controller = require("../controllers/publications.controller");
const express = require("express");
const router = express.Router();

module.exports = function (client) {
  const { del, get, post, put } = controller(client);

  router.delete("/", del);
  router.get("/", get);
  router.post("/", post);
  router.put("/", put);

  return router;
};