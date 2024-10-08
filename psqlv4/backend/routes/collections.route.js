const controller = require("../controllers/collections.controller");
const express = require("express");
const router = express.Router();

module.exports = function (client) {
  const { getCollections, getPublicationsByCollection } = controller(client);

  router.get("/", getCollections);

  router.get("/:collection_id/publications", getPublicationsByCollection);

  return router;
};