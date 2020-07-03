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
        const valor = req.query.pesquisa;

        try{
        const jogador = await Jogador.findOne(
            {   
            where: {
                nome: { [Op.like]: '%' + valor + '%' }
            }
            }
        )
        
        return res.redirect('perfilJogador/' + jogador.id);
        } catch (e) {
            return res.redirect('atleta');
        }

}
}

module.exports = pesquisaController;



