const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);
const csrf = require('csurf');



let app = express();

app.set("view engine", "hbs");

app.use(express.static("public"));

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

app.use(
  express.urlencoded({
    extended: false
  })
);

// enable CSRF
app.use(csrf());

app.use(function (err, req, res, next) {
  if (err && err.code == "EBADCSRFTOKEN") {
      req.flash('error_messages', 'The form has expired. Please try again');
      res.redirect('back');
  } else {
      next()
  }
});


// Share CSRF with hbs files
app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken;
  next();
})

app.use(session({
  store: new FileStore(),
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

app.use(flash());

// Register Flash middleware
app.use(function (req, res, next) {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  next();
});

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  // be sure to call the next() function in your middleware
  next();
})
// landing and products are on the same route
const landingRoutes = require('./routes/landing')
const userRegistration = require('./routes/users')
const cloudinaryRoutes = require('./routes/cloudinary');

async function main() {
  app.use('/', landingRoutes)
  app.use('/', userRegistration)
  app.use('/cloudinary', cloudinaryRoutes);

}


main();

app.listen(3000, () => {
  console.log("Server has started");
});