const express = require('express');
const router = express.Router();
const controller = require('../controllers/species.controller');  

module.exports = function(client) {
  const { getSpecies } = controller(client);  
  
  if (!getSpecies) {
    throw new Error('getSpecies function is not defined');
  }

  router.get('/', getSpecies);

  return router;
};
