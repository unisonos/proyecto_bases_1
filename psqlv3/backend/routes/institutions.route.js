const controller = require("../controllers/institutions.controller");
const express = require("express");
const router = express.Router();

module.exports = function (client) {
  const { get } = controller(client);

  router.get("/", get);

  return router;
};
