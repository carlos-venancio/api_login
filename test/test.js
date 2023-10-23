const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

// executa a api especificada no endereço


var tokenAdmin;

// testa a rota que diz se o servidor está online
describe('GET /', () => {

  // o done é usado para indicar o final do teste e evitar que o mesmo se repita
    it('Deveria estar online', (done) => {
        chai.request('http://localhost:3000')
          .get('/')
          .end((err,res) => {
              // testa se o status é igual a 200
              res.statusCode.should.equal(200,err)
            done();
          })
    })
})

// testa a rota de consulta do usuario
describe('GET /login?email=&senha=', () => {
    it('Deveria consultar o usuário',  (done) => {
        chai.request('http://localhost:3000')
          .get('/login?email=teste@teste.com&password=1234')
          .end((err,res) => {
                res.statusCode.should.equal(200)
                tokenAdmin = res.body.token
            done();
          })
          
    })
})

// testa a rota de cadastro do usuario 
describe('POST /', () => {
    it('Deveria cadastrar o usuário', (done) => {
      chai.request('http://localhost:3000')
        .post('/')
        .send({
          username:"AAAA",
          email: "teste@teste.com",
          password:"12345656@Sa"
        })
        .end((err,res) => {
              res.statusCode.should.equal(201,err)
          done();
      })
    })
})

// testar a rota recarregamento do token
describe('POST /session/refresh', () => {
    it('Deveria cadastrar o usuário', (done) => {
      chai.request('http://localhost:3000')
        .post('/session/refresh')
        .send({
          token: tokenAdmin
        })
        .end((err,res) => {
              res.statusCode.should.equal(200)
          done();
      })
    })
})