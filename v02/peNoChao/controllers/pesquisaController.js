const Sequelize = require('sequelize')
const sequelize = require('sequelize');
const configs = require('../configs/database')
const { connect } = require('../routes/atleta')
const moment = require("moment")
const {Comentario, Jogador, Postagem, Time, MidiasTime,Curtida } = require ('../models')
const Op = Sequelize.Op;
 
const conect = new Sequelize(configs)



/* Contantes acima add para conecta ao db */


const pesquisaController = {
    index: async (req, res) => {
        return res.render('pesquisa');
    }
}

module.exports = pesquisaController;



