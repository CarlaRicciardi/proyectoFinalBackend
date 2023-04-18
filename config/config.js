if (process.env.MODE != 'prod') {
  require('dotenv').config();
}

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
let PERSISTENCE = process.argv[2];
let PERSISTENCE_USERS = 'MONGO';


module.exports = { PORT, MONGO_URL, PERSISTENCE, PERSISTENCE_USERS };
