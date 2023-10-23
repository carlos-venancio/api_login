const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Teste',
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
  apis: ['./routes/*.js'], // caminho dos arquivos que contêm a documentação da API
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;