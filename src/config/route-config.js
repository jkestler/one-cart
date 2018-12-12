module.exports = {
   init(app){
      const itemRoutes = require("../routes/item");

      app.use(itemRoutes);
   }
}