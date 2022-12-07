const client = require('../../config/dbConnection');
const ObjectID = require('mongodb').ObjectId;

module.exports = class UsuarioModel {
  static async cadastrar(data) {
    console.log('Usuario Model - CadastrarUsuario');

    try {
      const addedUsuario = await client.db('peticoes').collection('usuarios').insertOne(data);
      console.log('Novo Usuario Cadastrado', addedUsuario.insertedId);
      return addedUsuario;
    } catch (error) {
      console.log('Cadastrar usuario error', error);
    }
  }

  static async login(data) {
    console.log('Usuario Model - Login');

    try {
      const user = await client.db('peticoes').collection('usuarios').findOne({ email: data.email });

      if (user && data.senha === user.senha) {
        return user._id;
      }

      return false;
    } catch (error) {
      console.log('Login usuario error', error);
      return false;
    }
  }
}
