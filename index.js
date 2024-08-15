const express = require("express");
const hbs = require("hbs");
const helpers = require("handlebars-helpers")();
const wax = require("wax-on");
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const FileStore = require("session-file-store")(session);
const csrf = require("csurf");
const cors = require("cors");
const morgan = require('morgan')

let app = express();

const corsOptions = {
  origin: [
    "https://3000-vincelee78-project3wall-4ai0raicy5f.ws-us115.gitpod.io", 
    "https://8080-vincelee78-project3expr-u85bcv5u3lt.ws-us115.gitpod.io"
    
  ],// Replace with your frontend's URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(cors());


app.set("view engine", "hbs");

app.use(express.static("/public"));

// app.use(cors());

app.use(
  session({
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

hbs.registerHelper(helpers);
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(morgan('dev'))
// use the csurf middleware
// app.use(csrf());
const csrfInstance = csrf();
app.use(function (req, res, next) {

  // exclude whatever url we want from CSRF protection
  if (
    req.url == "/checkout/process_payment" ||
    req.url.slice(0, 5) == "/api/"
  ) {
    // don't perform csrf checks
    next();
  } else {
    // if it is any other routes, then perform csrf check
    csrfInstance(req, res, next);
  }
});

// Share CSRF with hbs files
app.use(function (req, res, next) {
  if (req.csrfToken) {
    res.locals.csrfToken = req.csrfToken();
  }
  next();
});

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
});

app.use(function (err, req, res, next) {
  if (err && err.code == "EBADCSRFTOKEN") {
    req.flash("error_messages", "The form has expired. Please try again");
    res.redirect("back");
  } else {
    next();
  }
});

// Share CSRF with hbs files
app.use(function (req, res, next) {
  if (req.csrfToken) {
    res.locals.csrfToken = req.csrfToken();
  }
  next();
});

// landing and products are on the same route
const landingRoutes = require("./routes/landing");
const userRegistration = require("./routes/users");
const cloudinaryRoutes = require("./routes/cloudinary");
const cartRoutes = require("./routes/cart");
// const checkoutRoutes = require("./routes/api/checkout");
const checkoutRoutes = require('./routes/checkout');
const ordersRoutes = require('./routes/orders')
const {
  checkIfAuthenticatedJWT
} = require("./middleware");

const api = {
  wallBeds: require("./routes/api/products"),
  users: require("./routes/api/users"),
  cart: require("./routes/api/cart"),
  checkout: require("./routes/api/checkout"),
  search: require("./routes/api/search"),
  stripe: require('./routes/api/stripe'),
  orders: require('./routes/api/orders')
};

async function main() {
  app.use("/", landingRoutes);
  app.use("/", userRegistration);
  app.use("/cloudinary", cloudinaryRoutes);
  app.use("/cart", express.json(), cartRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/orders", ordersRoutes);
  app.use("/api/allproducts", express.json(), api.wallBeds);
  app.use("/api/users", express.json(), api.users);
  app.use("/api/search", express.json(), api.search)
  app.use("/api/cart", express.json(), api.cart);
  app.use("/api/checkout",  express.json(), api.checkout);
  app.use("/api/stripe", checkIfAuthenticatedJWT, express.json(), api.stripe);
  app.use("/api/orders", checkIfAuthenticatedJWT, express.json(), api.orders);
  // app.use('/api/checkout', checkoutRoutes);
}

main();

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});