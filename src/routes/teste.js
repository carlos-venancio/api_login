const express = require('express');

const testeRoute = express.Router();

testeRoute.get('/',(req,res) => {
    res.status(200).send({
        message: 'Está funcionando'
    })
})

module.exports = testeRoute;