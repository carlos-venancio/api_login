# api_login
Um simples componente de login com email, senha e nome

## Rotas
~~~js
GET   https://localhost:3000/teste
~~~

Informa se a api esta funcionando

~~~js
POST   https://localhost:3000/
~~~

Enviar o email, nome e senha para poder criar uma conta. Uma sessão é criada automaticamente  

~~~js
GET   https://localhost:3000/:token
~~~

Valida se o usuário existe e está cadastrado no sistema. Uma sessão é criada automaticamente
