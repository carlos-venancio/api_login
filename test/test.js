const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app')
const should = chai.should();

chai.use(chaiHttp);

console.log(app)
// testa se o servidor está online
describe('Teste do servidor\n', () => {

  describe('GET /', () => {
      it('Testando se o servidor está online', () => {
          const { status, body } = chai.request(app).get('/')
          console.log(status,body)
      })
  })

})

// testa todas as rotas do login
describe('Login', () => {


})