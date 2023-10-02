'use strict';

exports.get = (req,res) => {
    const token = req.params.token;

    res.status(200).send({
        token: 'token',
        expirity: new Date().toLocaleTimeString()
    });
}

exports.post = (req,res) => {
    
    res.status(200).send({
        token: 'token',
        expirity: new Date().toLocaleTimeString()
    });
}