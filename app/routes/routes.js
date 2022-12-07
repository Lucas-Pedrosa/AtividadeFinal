const { 
  cadastrar,
  login,
  checkToken,
  tokenUserId
} = require('../controllers/usuarioController');
const {
  todasPeticoes,
  criarPeticao,
  assinarPeticao,
  deletarPeticao,
  deletarTudo
} = require('../controllers/peticoesController');

const { check, validationResult } = require('express-validator');

module.exports = {
  cadastrarUsuario: (app) => {
    app.post('/usuario/cadastrar',
    [
      check('nome').isLength({ min: 2, max: 20 }).withMessage('O nome deve conter entre 2 e 20 caracteres.'),
      check('email').isEmail().normalizeEmail().withMessage('Insira um email válido.'),
      check('senha').isLength({ min: 5, max: 50 }).withMessage('A senha deve ter entre 5 e 50 caracteres.')
    ], (req, res) => {
      const validation = validationResult(req);

      if (!validation.isEmpty()) {
        const errors = validation.array();
        res.status(403).json(errors);
      } else {
        cadastrar(req, res);
      }
    });
  },

  login: (app) => {
    app.post('/usuario/login', 
    [
      check('email').isEmail().normalizeEmail().withMessage('Insira um email válido.')
    ], (req, res) => {
      const validation = validationResult(req);

      if (!validation.isEmpty()) {
        const errors = validation.array();
        res.status(403).json(errors);
      } else {
        login(req, res);
      }
    });
  },

  todasPeticoes: (app) => {
    app.get('/peticoes', (req, res) => {
      todasPeticoes(req, res);
    })
  },

  criarPeticao: (app) => {
    app.post('/peticoes/criar', 
    [
      check('titulo').isLength({ min: 5, max: 50 }).withMessage('O titulo deve conter entre 5 e 50 caracteres.'),
      check('descricao').isLength({ min: 5, max: 100 }).withMessage('A descricao deve conter entre 5 e 100 caracteres.'),
      check('foto').isLength({ min: 5 }).withMessage('O link deve conter mais de 5 caracteres.'),
    ], checkToken, (req, res) => {
      const validation = validationResult(req);

      if (!validation.isEmpty()) {
        const errors = validation.array();
        res.status(403).json(errors);
      } else {
        userId = tokenUserId(req).id;
        criarPeticao(req, res, userId);
      }
    });
  },

  assinarPeticao: (app) => {
    app.post('/peticoes/assinar/:peticaoId', checkToken, (req, res) => {
      userId = tokenUserId(req).id;
      const { peticaoId } = req.params;

      assinarPeticao(req, res, userId, peticaoId);
    });
  },

  deletarPeticao: (app) => {
    app.delete('/peticoes/deletar/:peticaoId', checkToken, (req, res) => {
      userId = tokenUserId(req).id;
      const { peticaoId } = req.params;

      deletarPeticao(req, res, userId, peticaoId);
    });
  },

  deletarTudo: (app) => {
    app.delete('/peticoes/deletartudo', checkToken, (req, res) => {
      userId = tokenUserId(req).id;

      deletarTudo(req, res, userId);
    });
  }
}
