const express = require('express');
const morgan = require('morgan');
const direccion = require('path');

const app = express();

const {mongoose} = require('./database');

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', require('./routes/user.routes'));

app.use(express.static(direccion.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Servidor en el Puerto ${app.get('port')}`);
});
