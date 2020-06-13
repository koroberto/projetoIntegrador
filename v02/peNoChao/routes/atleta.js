var express = require('express');
var router = express.Router();
var AtletaController = require('../controllers/AtletaController');
const auth = require ('../configs/auth.js')

router.get('/',auth, AtletaController.view);
router.post('/', AtletaController.store);

module.exports = router;
