const express = require('express');
const rutas = express.Router();
const User = require('../models/user');

rutas.get('/', async(req, res) => {

    const usuarios = await User.find();
    res.json(usuarios);

});

rutas.get('/:id', async(req, res) => {

    const usuario = await User.findById(req.params.id);
    res.json(usuario);

});

rutas.post('/', async(req, res) => {

    const {nombre_usuario, cedula_usuario,
           telefono_usuario, mail_usuario} = req.body;

    const nuevo_usuario = new User({
        nombre_usuario,
        cedula_usuario,
        telefono_usuario,
        mail_usuario
    });
    
    await nuevo_usuario.save();

    res.json(
        {status: 'Se ha guardado un registro'}
    );

});

rutas.put('/:id', async(req, res) => {

    const {nombre_usuario, cedula_usuario,
           telefono_usuario, mail_usuario} = req.body;
    
    const nuevos_datos = {nombre_usuario, cedula_usuario,
                          telefono_usuario, mail_usuario};
                          
    await User.findByIdAndUpdate(req.params.id, nuevos_datos);                      

    res.json(
        {status: 'Se ha actualizado el registro'}
    );

});

rutas.delete('/:id', async(req, res) => {

    await User.findByIdAndRemove(req.params.id);

    res.json(
        {status: 'Se ha eliminado el registro'}
    );

});

module.exports = rutas;