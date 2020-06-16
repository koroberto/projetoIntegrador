var express = require('express');
var router = express.Router();
var AtletaController = require('../controllers/AtletaController');
const auth = require ('../configs/auth.js')
const upload = require('../configs/uploads')

router.get('/',auth, AtletaController.view);
router.post('/',upload.any(), AtletaController.store);

module.exports = router;
