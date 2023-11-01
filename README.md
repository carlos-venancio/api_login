# api_login
Um simples componente de login com email, senha e nome, usando token para manter sessões.

> :bulb: **Dica**: Acesse a documentação completa em:  https://api-login-mn7h.onrender.com/api-docs

## Rotas


### <font color="#F4A732">Teste do servidor </font>

~~~js
GET https://localhost:3000/teste
~~~
Informa se a api esta funcionando

---

### <font color="#F4A732"> Cadastra o usuário </font>
~~~js
POST https://localhost:3000/
~~~

Envie o email, nome e senha para poder criar uma conta. Uma sessão é criada automaticamente  

#### Parametros 

Nome        | Necessidade| Exemplo 
----        | ---------- | ------- 
email       | necessário | example@gmail.com 
password    | necessário | @Exemplo1234 
username    | necessário | Example

##### Body

~~~json
{
    "email":"example@gmail.com",
    "password":"@Exemplo1234",
    "username":"Example"
}
~~~

---

### <font color="#F4A732"> Valida a conta </font>
~~~js
POST - https://localhost:3000/login
~~~
Valida se o usuário existe e está cadastrado no sistema. Uma sessão é criada automaticamente

#### Parametros 

Nome        | Necessidade| Exemplo 
----        | ---------- | ------- 
email       | necessário | example@gmail.com 
password    | necessário | @Exemplo1234 

##### Query

~~~js
?email=example@gmail.com&password=@Exemplo1234
~~~

##### Body

~~~json
{
    "email":"example@gmail.com",
    "password":"@Exemplo1234"
}
~~~

---

### <font color="#F4A732"> Gera um novo token </font>
~~~js
POST - https://localhost:3000/session/refresh
~~~
Essa rota é usada para criar um novo token caso o usuário ainda esteja ativo na expiração do token e, assim, manter o usuário logado.

#### Parametros 

Nome        | Necessidade| Exemplo 
----        | ---------- | ------- 
token       | necessário | alkçamaknkjxkelchbjwçlchvbl.cdewjblkjclcvhbdwchrcv.cjweblrvcjhbhkrbehh  

##### Body

~~~json
{
    "token":"alkçamaknkjxkelchbjwçlchvbl.cdewjblkjclcvhbdwchrcv.cjweblrvcjhbhkrbehh"
}
~~~