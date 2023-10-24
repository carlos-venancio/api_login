const chai = require('chai');
const chaiHttp = require('chai-http');
// const app = require('../src/app')


require('dotenv').config()

chai.should();
chai.use(chaiHttp);

let contentToken;

// testa a rota que diz se o servidor está online
describe('/GET teste', () => {

  // o done é usado para indicar o final do teste e evitar que o mesmo se repita
    it('Deveria estar online', (done) => {
      chai.request('http://localhost:3000')
          .get('/')
          .end((err,res) => {
              // testa se o status é igual a 200
              res.statusCode.should.equal(200)
            done();
          })
    })
})

// testa a rota de consulta do usuario
describe('/GET usuario', () => {
    
  it('Deveria consultar o usuário',  (done) => {
    chai.request('http://localhost:3000')
          .get('/login')
          .query({
            email: process.env.EMAIL_TESTE,
            password: process.env.SENHA_TESTE
          })
          .end((err,res) => {

            // imprime o corpo com o erro caso dê errado
              if (res.statusCode != '200') console.log(res.body)
              
              else {
                res.body.should.have.property('token');
                res.body.should.have.property('status').eql('200');
                res.body.should.have.property('username');
                contentToken = res.body.token;
              }

            done();
          })
          
    })
})

// testa a rota de cadastro do usuario 
describe('/POST usuario', () => {
   
  it('Deveria cadastrar o usuário (apenas simula)', (done) => {    
    chai.request('http://localhost:3000')
      .post('/')
      .send({
        username:"AAAA",
        email: process.env.EMAIL_TESTE,
        password: '12345@Aa'
      })
      .end((err,res) => {
        
          if (res.statusCode != '201') console.log(res.body)
          
          
          res.body.should.have.property('token');
          res.body.should.have.property('status').eql('201');
          res.body.should.have.property('username');
          
        done();
      })

  })
})

// testar a rota recarregamento do token
describe('/POST session', () => {
    it('Deveria recarregar o token', (done) => {
      chai.request('http://localhost:3000')
        .post('/session/refresh')
        .send({
          token: contentToken
        })
        .end((err,res) => {

          if (res.statusCode != '201') console.log(res.body)
          
          res.statusCode.should.equal(201)
          res.body.should.have.property('token');
          res.body.should.have.property('status').eql('201');
          res.body.should.have.property('username');          
          done();
      })
    })
})