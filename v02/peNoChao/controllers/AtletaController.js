const Sequelize = require('sequelize')
const configs = require('../configs/database')
const conect = new Sequelize(configs)
/* Contantes acima add para conecta ao db */


const AtletaController =  {
    view: (req,res) => {
        return res.render('atleta');
    },

    //metodo para armazenar a publicação da resenha
    store: async (req,res) => {
        const {descricao} = req.body;
        const publicar = await conect.query("INSERT INTO postagens (descricao)VALUES (:descricao)",
        {
            replacements:{
                descricao,
                jogadores_id: 2, //estou colocando ID fixo 2 para testar
                create_at: new Date(),
                update_at: new Date(),
            },
            type: Sequelize.QueryTypes.INSERT,
        },);

        return res.render('atleta');
    }
}

module.exports = AtletaController;