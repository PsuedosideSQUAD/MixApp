const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require('passport');
const PORT = process.env.PORT || 8080;

// connect to the database and load models
require('./server/models').connect(
	process.env.MONGODB_URI || "mongodb://localhost/mixit",
   {
   	useMongoClient: true
   }
);

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// pass the passport middleware
app.use(passport.initialize());

// Serve up static assets
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
