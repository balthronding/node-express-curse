const mongoose = require('mongoose');

const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_BBDD = process.env.MONGODB_BBDD;
const MONGODB_URL = `mongodb://${MONGODB_HOST}/${MONGODB_BBDD}`;

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology : true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db => console.log('Conectado a la BBDD'))
  .catch(err => console.error(err));  