const Sequelize = require('sequelize')
const configs = require('../configs/database')
const { connect } = require('../routes/atleta')
const moment = require("moment")

const conect = new Sequelize(configs)
/* Contantes acima add para conecta ao db */


const AtletaController = {
    view: (req, res) => {

        const usuario = conect.query("SELECT * FROM `postagens`", { type: Sequelize.QueryTypes.SELECT })
            .then(function (publications) {
                // console.log(publications)
                return res.render('atleta', { publications, moment });
                
            })

    },

    //metodo para armazenar a publicação da resenha
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

        return res.redirect('atleta');
    }
}

module.exports = AtletaController;



