const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { modelUser } = require('../persistence/daos/users/DaoMongoUsers.js');
const logger = require('../config/logger.js');

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    logger.log('error', 'error en auth');
    res.redirect('/api/login');
  }
}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const startPassport = () => {
  passport.use(
    'login',
    new LocalStrategy((username, password, done) => {
      modelUser.findOne({ username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          logger.log('info', 'User Not Found with username');
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          logger.log('info', 'Invalid Password');
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
            logger.log('error', 'Error in SignUp ');
            return done(err);
          }

          if (user) {
            logger.log('error', 'User already exists');
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
            cartActual: 'empty',
          };
          modelUser.create(newUser, (err, userWithId) => {
            if (err) {
              logger.log('error', 'Error in Saving user in Usuarios ');
              return done(err);
            }

            logger.log('info', user);
            logger.log('info', 'User Registration succesful');
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
};

module.exports = { startPassport, auth };
