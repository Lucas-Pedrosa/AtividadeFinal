const app = require('./config/server');
const routes = require('./app/routes/routes');

routes.cadastrarUsuario(app);
routes.login(app);
routes.todasPeticoes(app);
routes.criarPeticao(app);
routes.assinarPeticao(app);
routes.deletarPeticao(app);
routes.deletarTudo(app);

module.exports = app;
