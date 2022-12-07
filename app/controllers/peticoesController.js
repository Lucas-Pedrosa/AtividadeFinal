const PeticoesModel = require('../models/peticoesModel');

module.exports.todasPeticoes = async (req, res) => {
  console.log('Peticoes Controller - todasPeticoes');
  const peticoes = await PeticoesModel.todasPeticoes();

  if (!peticoes) {
    res.status(400).json({ "mensagem": "Erro ao buscar peticoes" });
    return;
  }

  if (!peticoes.length > 0) {
    res.status(200).json({ "mensagem": "Sem peticoes" });
    return;
  }
  res.status(200).json(peticoes);
}

module.exports.criarPeticao = async (req, res, userId) => {
  console.log('Peticoes Controller - criarPeticao');
  const peticao = req.body;
  const peticaoCriada = await PeticoesModel.criarPeticao(peticao, userId);

  if (peticaoCriada.acknowledged) {
    return res.status(200).json(peticaoCriada);
  } else {
    return res.status(400).json({ "mensagem": "Erro ao criar peticao." });
  }
}

module.exports.assinarPeticao = async (req, res, userId, peticaoId) => {
  console.log('Peticoes Controller - assinarPeticao');
  try {
    const changedPeticao = await PeticoesModel.assinarPeticao(peticaoId, userId);

    if (changedPeticao.acknowledged && changedPeticao.modifiedCount === 1) {
      res.status(200).json({ "mensagem": "Peticao assinada com sucesso!" });
    } else {
      res.status(400).json({ "mensagem": "Não foi possível assinar a peticao." });
    }
  } catch (error) {
    res.status(400).json({ "mensagem": "Erro ao assinar a peticao." });
  }
}

module.exports.deletarPeticao = async (req, res, userId, peticaoId) => {
  console.log('Peticoes Controller - deletarPeticao');

  try {
    const peticao = await PeticoesModel.consultarPeticao(peticaoId);
    
    if (peticao && peticao.criadoPor === userId) {
      const deletedPeticao = await PeticoesModel.deletarPeticao(peticaoId);
      console.log(deletedPeticao);
      if (deletedPeticao.acknowledged && deletedPeticao.deletedCount > 0) {
        res.status(200).json({ "mensagem": "Peticao deletada com sucesso" });
      } else {
        res.status(400).json({ "mensagem": "Erro ao deletar a peticao." });
      }
      return;
    }

    if (peticao && peticao.criadoPor !== userId) {
      res.status(400).json({ "mensagem": "Usuário não autorizado a deletar petição" });
      return;
    }

    res.status(400).json({ "mensagem": "Petição inexistente" });

  } catch (error) {
    res.status(400).json({ "mensagem": "Erro ao deletar a peticao." });
  }
}

module.exports.deletarTudo = async (req, res, userId) => {
  console.log('Peticoes Controller - deletarTudo');

  try {
    const deletedPeticoes = await PeticoesModel.deletarTudo(userId);
    if (deletedPeticoes.acknowledged) {
      res.status(200).json({ "mensagem": $`deletados {deletedPeticoes.deletedCount} petições` });
    }
  } catch (error) {
    res.status(400).json({ "mensagem": "Erro ao deletar a peticao." });
  }
}
