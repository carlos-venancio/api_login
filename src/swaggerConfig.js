const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Login',
    version: '1.0.0',
    description: 'documentação api login'
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.js', //caminho dos arquivos dentro da pasta routes
         'src/controllers/*.js'//caminho dos arquivos dentro da pasta controllers
         
  ], // caminho dos arquivos que contêm a documentação da API
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
