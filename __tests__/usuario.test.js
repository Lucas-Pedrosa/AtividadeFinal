const supertest = require('supertest');
const app = require('../index');

const apiUsuario = '/usuario';
const apiPeticoes = '/peticoes';

const cadastrar = {
  "email": "lucas2@gmail.com",
  "nome": "lucas",
  "senha": "lucas"
}

const cadastrarValidacao = {
  "email": "",
  "nome": "",
  "senha": ""
}

const login = {
  "email": "lucasteste@gmail.com",
  "senha": "lucas"
}

const loginError = {
  "email": "lucas@gmail.com",
  "senha": "teste"
}

describe('usuario', () => {

  describe('usuarios route', () => {
    describe('cadastrar usuario', () => {
      it('should return 200', async () => {
        await supertest(app).post(`${apiUsuario}/cadastrar`).send(cadastrar).expect(200)
      })

      it('should return validation error', async () => {
        await supertest(app).post(`${apiUsuario}/cadastrar`).send(cadastrarValidacao).expect(403)
      })
    })

    describe('login', () => {
      it('should return 200', async () => {
        await supertest(app).post(`${apiUsuario}/login`).send(login).expect(200)
      })

      it('should return login error', async () => {
        await supertest(app).post(`${apiUsuario}/login`).send(loginError).expect(400)
      })
    })
  })

})

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTIxNmZlMmE1ZWJhN2UyZDlkNWQwYiIsImlhdCI6MTY3MDUxODUzM30.-sUVhLfSbbVlUz3bzDWyjZdje-om6Y8VvdsI95dU8TA'

const peticao = {
  "titulo": "titulo peticao 6",
  "descricao": "descricao peticao 2",
  "foto": "link peticao 2"
}

describe('peticoes', () => {

  describe('peticoes route', () => {
    describe('todas peticoes', () => {
      it('should return 200', async () => {
        await supertest(app).get(`${apiPeticoes}`).expect(200)
      })
    })

    describe('criar peticoes', () => {
      it('should return 200', async () => {
        await supertest(app).post(`${apiPeticoes}/criar`).set('Authorization', `token ${token}`).send(peticao).expect(200)
      })

      it('should return invalid token', async () => {
        await supertest(app).post(`${apiPeticoes}/criar`).set('Authorization', `token 123}`).send(peticao).expect(400)
      })

      it('should return token required', async () => {
        await supertest(app).post(`${apiPeticoes}/criar`).send(peticao).expect(401)
      })
    })

    describe('assinar peticao', () => {
      it('should return 200', async () => {
        await supertest(app).post(`${apiPeticoes}/assinar/6390a4def833d324550b3a20`).set('Authorization', `token ${token}`).expect(200)
      })

      it('should return 400', async () => {
        await supertest(app).post(`${apiPeticoes}/assinar/6390a4def`).set('Authorization', `token ${token}`).expect(400)
      })
    })

    describe('deletar peticao', () => {
      it('should return 200', async () => {
        await supertest(app).delete(`${apiPeticoes}/deletar/639216381706474132225532`).set('Authorization', `token ${token}`).expect(200)
      })

      it('should return 400', async () => {
        await supertest(app).delete(`${apiPeticoes}/deletar/6390a4def`).set('Authorization', `token ${token}`).expect(400)
      })
    })

    describe('deletar todas peticoes', () => {
      it('should return 200', async () => {
        await supertest(app).delete(`${apiPeticoes}/deletartudo`).set('Authorization', `token ${token}`).expect(200)
      })
    })
  })

})
