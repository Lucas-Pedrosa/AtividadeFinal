# AtividadeFinal
Nas rotas com AUTENTICAÇÃO, é necessário inserir o token obtido no login no header Authorization do request. (Ex. Authorization: token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGZmMmYwOGM3MWVkYWIyZDc2Mjg4NiIsImlhdCI6MTY3MDM3ODIzOH0.G2D4NeRQCzyeeoMt41dW0t3JQiF1tsn31C7akQT6yn8)
<br>Dica: É possível fazer as requisições diretamente no arquivo request.rest ao instalar a extensão REST Client no VS Code.

Rotas:
Criar usuário (POST):
  <br>https://atividade-final.vercel.app/usuario/cadastrar
  <br>{
  "email": "teste@gmail.com",
  "nome": "teste",
  "senha": "teste"
  }
  <br>
 <br>Fazer Login (POST):
  <br>https://atividade-final.vercel.app/usuario/cadastrar
  <br>{
  "email": "teste@gmail.com",
  "senha": "teste"
  }
 
 <br>Ver todas as petições (GET):
  <br>https://atividade-final.vercel.app/peticoes
  
 <br>Criar Petição (POST, AUTENTICAÇÃO):
  <br>https://atividade-final.vercel.app/peticoes/criar
  <br>{
  "titulo": "peticao ",
  "descricao": "peticao ",
  "foto": "link"
  }
  
 <br>Assinar Petição (POST, AUTENTICAÇÃO):
  <br>https://atividade-final.vercel.app/peticoes/assinar/{peticaoId}
  
<br> Excluir Petição (DELETE, AUTENTICAÇÃO):
 <br> https://atividade-final.vercel.app/peticoes/deletar/{peticaoId}
  
<br> Deletar todas as petições do usuário logado (DELETE, AUTENTICAÇÃO):
<br>  https://atividade-final.vercel.app/peticoes/deletartudo
