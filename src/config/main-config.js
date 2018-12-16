const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");

module.exports = {
   init(app, express){
      app.use(bodyParser.json());
      app.use(expressValidator());
      app.use(session({
         secret: process.env.cookieSecret,
         resave: false,
         saveUninitialized: false,
         cookie: { maxAge: 60000 }
       }));
       app.use(flash());
   }
};