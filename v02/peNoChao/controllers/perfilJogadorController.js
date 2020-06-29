const Sequelize = require('sequelize');
const configs = require('../configs/database');
const conect = new Sequelize(configs);
const {Jogador, Time, MidiasTime, Curtida } = require ('../models')
/* Contantes acima add para conecta ao db */


const perfilJogadorController = {
    index: async (req, res) => {
        let idJogador = req.params.id;
        //console.log('id do jogador é:'+idJogador)

        let jogador = await Jogador.findByPk(idJogador);


        console.log(jogador)
        return res.render('perfilJogador', {jogador});
    }
}

module.exports = perfilJogadorController;



