var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/LoginController');
var CadastroController = require('../controllers/CadastroController');
var JogosController = require('../controllers/JogosController');
var TimesController = require('../controllers/TimesController');
var CadastroTimesController = require('../controllers/CadastroTimesController');
var passwordController = require('../controllers/passwordController');
const perfilJogadorController = require('../controllers/perfilJogadorController');
const auth = require ('../configs/auth.js')
const upload = require('../configs/uploads')




/* GET home page. */
router.get('/', LoginController.login);
router.post('/', LoginController.store);
router.get('/sair', LoginController.sair);

router.get('/consulta', LoginController.consulta);

router.post('/forgot_password', passwordController.forgotPass);
router.get('/reset_password/:token', passwordController.resetPassword_get);
router.post('/reset_password', passwordController.resetPassword_post);

router.get('/cadastro', CadastroController.cadastro);
router.post('/cadastro', CadastroController.store);

router.get('/atualizar',auth,CadastroController.atualizar);
router.post('/atualizar',upload.any(),auth, CadastroController.update);


router.get('/jogos', JogosController.jogos);
router.get('/times', TimesController.index);
router.get('/times/:id/ingressar', auth, TimesController.ingressar);

router.get('/cadastroTime', CadastroTimesController.cadastro);
router.post('/cadastroTime',upload.any(),auth, CadastroTimesController.store);

router.get('/perfilJogador/:id?', perfilJogadorController.index);


//Abaixo temos o codigo inicial criado pelo express generator
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
