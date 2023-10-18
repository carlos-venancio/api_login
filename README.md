# api_login
Um simples componente de login com email, senha e nome

## Rotas

### Teste do servidor 

~~~js
GET https://localhost:3000/teste
~~~
Informa se a api esta funcionando

### Cadastra o usuário
~~~js
POST https://localhost:3000/
~~~

Enviar o email, nome e senha para poder criar uma conta. Uma sessão é criada automaticamente  

### Valida a conta
~~~js
GET - https://localhost:3000/login?
~~~
Valida se o usuário existe e está cadastrado no sistema. Uma sessão é criada automaticamente

#### Parametros 


Nome    | Necessidade | Exemplo 
----    | ---------- | ------- 
email   | necessário | example@gmail.com 
senha   | necessário | @Exemplo1234 
