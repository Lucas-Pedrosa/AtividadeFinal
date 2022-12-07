# AtividadeFinal
Nas rotas com AUTENTICAÇÃO, é necessário inserir o token obtido no login no header Authorization do request. (Ex. Authorization: token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGZmMmYwOGM3MWVkYWIyZDc2Mjg4NiIsImlhdCI6MTY3MDM3ODIzOH0.G2D4NeRQCzyeeoMt41dW0t3JQiF1tsn31C7akQT6yn8)
Dica: É possível fazer as requisições diretamente no arquivo request.rest ao instalar a extensão REST Client no VS Code.

Rotas:
Criar usuário (POST):
  https://atividade-final.vercel.app/usuario/cadastrar
  {
  "email": "teste@gmail.com",
  "nome": "teste",
  "senha": "teste"
  }
  
 Fazer Login (POST):
  https://atividade-final.vercel.app/usuario/cadastrar
  {
  "email": "teste@gmail.com",
  "senha": "teste"
  }
 
 Ver todas as petições (GET):
  https://atividade-final.vercel.app/peticoes
  
 Criar Petição (POST, AUTENTICAÇÃO):
  https://atividade-final.vercel.app/peticoes/criar
  {
  "titulo": "peticao ",
  "descricao": "peticao ",
  "foto": "link"
  }
  
 Assinar Petição (POST, AUTENTICAÇÃO):
  https://atividade-final.vercel.app/peticoes/assinar/{peticaoId}
  
 Excluir Petição (DELETE, AUTENTICAÇÃO):
  https://atividade-final.vercel.app/peticoes/deletar/{peticaoId}
  
 Deletar todas as petições do usuário logado (DELETE, AUTENTICAÇÃO):
  https://atividade-final.vercel.app/peticoes/deletartudo
