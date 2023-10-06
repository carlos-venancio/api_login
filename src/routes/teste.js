const express = require('express');

const testeRoute = express.Router();

testeRoute.get('/',(req,res) => {
    res.status(200).send({
        status: 200,
        message: 'Está funcionando'
    })
})

module.exports = testeRoute;