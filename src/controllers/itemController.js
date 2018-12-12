const itemQueries = require('../db/queries.items.js');

module.exports = {
   index(req, res, next){
      res.send("Home");
   }
}