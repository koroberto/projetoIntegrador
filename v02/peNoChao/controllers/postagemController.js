const Sequelize = require('sequelize')
const moment = require("moment")



const {Comentario, Postagem } = require ('../models') 
const configs = require('../configs/database')
const { connect } = require('../routes/atleta')
const conect = new Sequelize(configs)


const postagemController = {

   
    store: async (req, res) => {
        const { descricao } = req.body;
        const [foto] = req.files;
        const { id } = req.session.jogador;
        // console.log(foto);
        const publicar = await conect.query("INSERT INTO postagens (descricao, jogadores_id, path, create_at, update_at)VALUES (:descricao, :jogadores_id,:path , :create_at, :update_at)",
            {
                replacements: {
                    descricao,
                    jogadores_id: id,
                    create_at: new Date(),
                    update_at: new Date(),
                    path: foto.filename,
    
                },
                type: Sequelize.QueryTypes.INSERT,
            });
            
        return res.redirect('/atleta');
    },

}


module.exports = postagemController;
