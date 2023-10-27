const pino = require('pino')({
    level: 'error',
    // formatter
});
;

// const formatter = pino.transport({
//     target: 'pino-pretty',
//     options: {
//         colorize: true,
//         levelFirst: true
//     }
// })

// configurações do registro de log


module.exports = pino;