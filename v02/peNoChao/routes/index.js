var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/LoginController');
var CadastroController = require('../controllers/CadastroController');
var JogosController = require('../controllers/JogosController');
var TimesController = require('../controllers/TimesController');
var CadastroTimesController = require('../controllers/CadastroTimesController');


/* GET home page. */
router.get('/', LoginController.login);
router.post('/', LoginController.store);

router.get('/forgot_password', LoginController.forgotPass);
router.post('/forgot_password', LoginController.forgotPass);

// router.get('/reset_password/:jogador/:token', (req,res) => { res.send(req.params.token)});
router.get('/reset_password/:token', LoginController.resetPassword_get);
router.post('/reset_password', LoginController.resetPassword_post);

router.get('/cadastro', CadastroController.cadastro);
router.post('/cadastro', CadastroController.store);

router.get('/jogos', JogosController.jogos);
router.get('/times', TimesController.times);

router.get('/cadastroTimes', CadastroTimesController.cadastro);
router.post('/cadastroTimes', CadastroTimesController.store);


//Abaixo temos o codigo inicial criado pelo express generator
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
