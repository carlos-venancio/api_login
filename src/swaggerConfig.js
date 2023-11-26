const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Login',
    version: '1.0.0',
    description: 'Documentação da api de login'
  },
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.js', 'src/controllers/*.js'], // caminho dos arquivos que contêm a documentação da API
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
