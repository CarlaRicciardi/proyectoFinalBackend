const express = require('express');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const modelUser = require('./persistence/models/users.js');

const router = require('./routes/index.js');
const config = require('./config/config.js');

const app = express();
const httpServer = require('http').createServer(app);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const { engine } = require('express-handlebars');
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  }),
);

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    modelUser.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false);
      }
      return done(null, user);
    });
  }),
);
passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      modelUser.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log('Error in SignUp: ' + err);
          return done(err);
        }

        if (user) {
          console.log('User already exists');
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
          name: req.body.name,
          address: req.body.address,
          age: req.body.age,
          phone: req.body.phone,
          url: req.body.url,
        };
        modelUser.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('Error in Saving user: ' + err);
            return done(err);
          }
          console.log(user);
          console.log('User Registration succesful');
          return done(null, userWithId);
        });
      });
    },
  ),
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  modelUser.findById(id, done);
});

/* Mongo Session */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60000 * 10,
      cookie: { maxAge: 60000 * 10 },
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);
httpServer.listen(config.PORT, () => {
  config.PORT, config.MONGO_URL, console.log(`Server listening on port http://localhost:${config.PORT}`);
});
