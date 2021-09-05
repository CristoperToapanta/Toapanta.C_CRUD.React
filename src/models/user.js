const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    nombre_usuario: {
        type: String,
        required: true
    }
    ,
    cedula_usuario: {
        type: String,
        required: true
    }
    ,
    telefono_usuario: {
        type: String,
        required: true
    }
    ,
    mail_usuario: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);