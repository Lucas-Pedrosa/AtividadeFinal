const UsuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

module.exports.cadastrar = async (req, res) => {
  console.log('Usuario Controller - Cadastrar');
  const usuario = req.body;
  const usuarios = await UsuarioModel.cadastrar(usuario);

  if (usuarios.acknowledged) {
    return res.status(200).json(usuarios);
  } else {
    return res.status(400).json({ "mensagem": "Erro ao criar usuario." });
  }
}

module.exports.login = async (req, res) => {
  console.log('Usuario Controller - Login');
  const usuario = req.body;
  const loginUser = await UsuarioModel.login(usuario);
  
  if (loginUser) {
    try {
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({
        id: loginUser
      }, secret);

      res.status(200).json({ "mensagem": "Login realizado com sucesso!", "Token": token, "IDUsuario": loginUser });
    } catch (error) {
      res.status(500).json({ "mensagem": error });
    }
  } else {
    res.status(400).json({ "mensagem": "Erro de autenticação" });
  }
}

const getToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token
}

module.exports.checkToken = (req, res, next) => {
  const token = getToken(req);

  if (!token) return res.status(401).json({ "mensagem": "Acesso negado! Insira um Token." });

  try {
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    res.status(400).json({ "mensagem": "Token Inválido!" });
  }
}

module.exports.tokenUserId = (req) => {
  const token = getToken(req);
  return jwt.decode(token);
}
