const express = require('express');
const passport = require('passport');
const { startPassport } = require('./middlewares/passport.js');
const { configMongoSession } = require('./middlewares/mongoSession.js');
const connectMongoDB = require('./persistence/mongoDB.js');

const router = require('./routes/index.js');
const rootRouter = require('./routes/root.js');
const config = require('./config/config.js');

const app = express();
const httpServer = require('http').createServer(app);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use(configMongoSession);
const connectToDB = new connectMongoDB();
connectToDB.connectDBMongo();

startPassport();
app.use(passport.initialize());
app.use(passport.session());

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

app.use('/', rootRouter);
app.use('/api', router);

httpServer.listen(config.PORT, () => {
  config.PORT, config.MONGO_URL, console.log(`Server listening on port http://localhost:${config.PORT}`);
});
