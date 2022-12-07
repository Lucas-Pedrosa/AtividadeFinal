const client = require('../../config/dbConnection');
const ObjectID = require('mongodb').ObjectId;

module.exports = class PeticoesModel {
  static async todasPeticoes() {
    console.log('Peticoes Model - todasPeticoes');

    const cursor = await client.db('peticoes').collection('peticoes').find();
    const peticoes = await cursor.toArray();
    return peticoes;
  }

  static async criarPeticao(peticao, userId) {
    console.log('Peticoes Model - criarPeticao');
    let data = {
      "criadoPor": userId,
      "dataCriacao": Date(Date.now()).toString(),
      "assinantes": []
    }
    data = Object.assign(peticao, data);

    try {
      const addedPeticao = await client.db('peticoes').collection('peticoes').insertOne(data);
      console.log('Nova Peticao Cadastrada', addedPeticao.insertedId);
      return addedPeticao;
    } catch (error) {
      console.log('Cadastrar peticao error', error);
    }
  }

  static async assinarPeticao(peticaoId, userId) {
    console.log('Peticoes Model - assinarPeticao');
    try {
      const changedPeticao = await client.db('peticoes').collection('peticoes').updateOne(
        { _id: ObjectID(peticaoId) },
        {
          $push: {
            "assinantes": { "assinanteId": userId }
          }
        }
      );
      console.log('Peticao Alterada', changedPeticao);
      return changedPeticao;
    } catch (error) {
      console.log('assinar peticao error', error);
    }
  }

  static async consultarPeticao(peticaoId) {
    console.log('Peticoes Model - consultarPeticao');

    try {
      return await client.db('peticoes').collection('peticoes').findOne({ _id: ObjectID(peticaoId) });
    } catch (error) {
      console.log('consultar peticao error', error);
    }
  }

  static async deletarPeticao(peticaoId) {
    console.log('Peticoes Model - deletarPeticao');
    try {
      return await client.db('peticoes').collection('peticoes').deleteOne({ _id: ObjectID(peticaoId) });
    } catch (error) {
      console.log('deletar peticao error', error);
    }
  }

  static async deletarTudo(userId) {
    console.log('Peticoes Model - deletarTudo');
    try {
      return await client.db('peticoes').collection('peticoes').deleteMany({ criadoPor: userId });
    } catch (error) {
      console.log('deletar peticao error', error);
    }
  }
}
