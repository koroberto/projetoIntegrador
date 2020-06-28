const Sequelize = require('sequelize')
const sequelize = require('sequelize');
const configs = require('../configs/database')
const { connect } = require('../routes/atleta')
const moment = require("moment")
const {Comentario, Jogador, Postagem, Time, MidiasTime,Curtida } = require ('../models')
const Op = Sequelize.Op;
 
const conect = new Sequelize(configs)
/* Contantes acima add para conecta ao db */



const AtletaController = {
    view:async (req, res) => {
        const idLogado = req.session.jogador.id;  

        let comentarios = await Comentario.findAll({
            limit:5,
            order:sequelize.literal('id DESC'),
        });
         let jogadores = await Jogador.findAll({
             where:{
                 id:{
                     [Op.ne]: idLogado
                 }
             },
             limit:6,
         });
          //console.log(jogadores)

         let times = await Time.findAll({
            include: [ {
                model: MidiasTime,
                require: true,
            } ]
         })
        // console.log(times)
        
        let publications = await Postagem.findAll({
            include: [ 
            {
                model: Jogador,
                require: true
            },
            {
                model: Curtida,
                require: true,
            },
            {
                model: Comentario,
                require: true,
            }
        ]
        });
        // console.log(publications)
        
       

        // const usuario = conect.query("SELECT * FROM `postagens`", { type: Sequelize.QueryTypes.SELECT })
        //     .then(function (publications) {
        //         // console.log(publications)
        //         return res.render('atleta', { publications, moment,comentarios });
                
        //     })
            return res.render('atleta', { publications, moment, comentarios, jogadores ,times});

    },

    //metodo para armazenar a publicação da resenha
    // store: async (req, res) => {
    //     const { descricao } = req.body;
    //     const [foto] = req.files;
    //     const { id } = req.session.jogador;
    //     // console.log(foto);
    //     const publicar = await conect.query("INSERT INTO postagens (descricao, jogadores_id, path, create_at, update_at)VALUES (:descricao, :jogadores_id,:path , :create_at, :update_at)",
    //         {
    //             replacements: {
    //                 descricao,
    //                 jogadores_id: id,
    //                 create_at: new Date(),
    //                 update_at: new Date(),
    //                 path: foto.filename,

    //             },
    //             type: Sequelize.QueryTypes.INSERT,
    //         });

    //     return res.redirect('atleta');
    // }
}

module.exports = AtletaController;



