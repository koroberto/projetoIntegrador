const Sequelize = require('sequelize')
const configs = require('../configs/database')
const conect = new Sequelize(configs)

const comentarioController = {
    index:(req, res ) => {
        
    },
    store: async (req, res) =>{
        const {postagens_id,jogador_id, descricao} = req.body 
        console.log(postagens_id,jogador_id, descricao)
        const comentario = await conect.query("INSERT INTO comentarios(descricao, jogadores_id, postagens_id, create_at, update_at) VALUES(:descricao, :jogadores_id, :postagens_id, :create_at, :update_at)",
        {
            replacements:{
                descricao, 
                jogadores_id:jogador_id, 
                postagens_id, 
                create_at: new Date(),
                update_at: new Date(),
            },
            type:Sequelize.QueryTypes.INSERT,

        } );
        if(comentario){
            console.log(comentario)
            return res.redirect('/atleta')
        }
    },
}

module.exports = comentarioController ; 