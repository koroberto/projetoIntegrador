const Sequelize = require('sequelize');
const configs = require('../configs/database');
const conect = new Sequelize(configs);
/* Contantes acima add para conecta ao db */


const perfilJogadorController = {
    index: (req, res) => {
            return res.render('perfilJogador');
    }
}

module.exports = perfilJogadorController;



