var express = require('express');
var router = express.Router();
var AtletaController = require('../controllers/AtletaController');
const comentarioController = require('../controllers/comentarioController');
const auth = require ('../configs/auth.js')
const upload = require('../configs/uploads');
const postagemController = require('../controllers/postagemController');

router.get('/',auth, AtletaController.view);

router.post('/postagem',upload.any(), postagemController.store);

router.post('/comentario',auth,comentarioController.store);

module.exports = router;
