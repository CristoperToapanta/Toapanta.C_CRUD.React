const mongoose = require('mongoose');

//const url = 'mongodb://localhost:27017/tbl_usuario';
const url = 'mongodb://mongo:27017/tbl_usuario';

mongoose.connect(url)
        .then(db => console.log("Base de Datos Conectada"))
        .catch(err => console.error(err));

module.exports = mongoose;