module.exports = {
   init(app){
      const itemRoutes = require("../routes/item");
      const userRoutes = require("../routes/user");

      app.use(itemRoutes);
      app.use(userRoutes);
   }
}