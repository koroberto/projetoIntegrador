var express = require('express');
var router = express.Router();
var AtletaController = require('../controllers/AtletaController');
const comentarioController = require('../controllers/comentarioController');
const auth = require ('../configs/auth.js')
const upload = require('../configs/uploads')

router.get('/',auth, AtletaController.view);
router.post('/',upload.any(), AtletaController.store);

router.post('/comentario',auth,comentarioController.store);

module.exports = router;
