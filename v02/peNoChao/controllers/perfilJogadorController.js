const Sequelize = require('sequelize')
const sequelize = require('sequelize');
const configs = require('../configs/database')
const { connect } = require('../routes/atleta')
const moment = require("moment")
const {Comentario, Jogador, Postagem, Time, MidiasTime,Curtida, Seguidor} = require ('../models')
const Op = Sequelize.Op;
 
const conect = new Sequelize(configs)



/* Contantes acima add para conecta ao db */


const perfilJogadorController = {
    index: async (req, res) => {
        let idJogador = req.params.id;
        const idLogado = req.session.jogador.id; 
        //console.log('id do jogador é:'+idJogador)
        let jogador = await Jogador.findByPk(idJogador);

        let comentarios = await Comentario.findAll({
            include: [ {
                model: Jogador,
                require: true,
            } ],
            // limit:5,
            order:sequelize.literal('id DESC'),
        });
        // const jogadorLogado = await Jogador.findOne({ where: {id:idLogado }});
        let jogadorLogado = await Jogador.findByPk(idLogado);

        //   console.log("=================",jogadorLogado)
         
         let jogadores = await Jogador.findAll({
             where:{
                 id:{
                     [Op.ne]: idLogado
                 }
             },
            //  limit:6,
         });
          //console.log(jogadores)
         let seguidor = await Seguidor.findAll({
             where:{
                jogador_id:{
                     [Op.eq]:idLogado
                 }
             }
         });
        //  console.log("$$$$$$$$$$$$$$$$$$",seguidor)

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

        let perfilSeguido = await Seguidor.findAll({
            include: [ {
                model:Jogador,
               
            } ],
            where:{
               jogador_id:{
                    [Op.eq]:idJogador
                }
            },
           
        });


        //console.log(jogador)
        return res.render('perfilJogador', {jogador,comentarios, publications,jogadorLogado,times,jogadores, moment ,seguidor, perfilSeguido});
    },
    createComentario: async(req, res )=>{
        try{
            // console.log("=================")
        const idLogado = res.locals.jogador.id
        let {postagens_id, perfilJogador, descricao} = req.body
        const comentario = await Comentario.create({
            descricao,
            jogadores_id:idLogado,
            postagens_id,
            create_at: new Date(),
            update_at: new Date(),
        })
        // console.log(postagens_id, perfilJogador, descricao, idLogado)

        return res.redirect(`/perfilJogador/${perfilJogador}#publicacao-`+postagens_id)

        }catch{
            return res.redirect(`/perfilJogador/${perfilJogador}#publicacao-`+postagens_id)
        }
    } ,
    likePostPerfilJogador: async (req, res)=>{
        const { jogador_id, postagens_id, perfilJogador } = req.body
        
        
        // console.log(jogador_id, postagens_id)

        try{
            const curtida = await Curtida.create({
                jogadores_id: jogador_id,
                postagens_id:postagens_id,
            },);
            return res.redirect(`/perfilJogador/${perfilJogador}#publicacao-`+postagens_id)

        }
        catch(error){
            // console.log(error);
            return res.send(error);
        }
        
    },
    seguirPerfilJogador:async(req, res)=>{

        const idPerfilJogador = req.body.idPerfilJogador;
        const idLogado = res.locals.jogador.id
        
        const resultado =  await Seguidor.create({
            jogador_id:idLogado,
            seguidor_id:idPerfilJogador,
        })
        // console.log(idPerfilJogador)
        return res.redirect(`/perfilJogador/${idPerfilJogador}`)
        
    },
    deixarSeguirPerfilJogador:async(req, res)=>{
        const {idTabelaSeguidor, perfilJogador} = req.body

        // console.log("+++++++",idTabelaSeguidor+"+++++"+perfilJogador)
        
        const resultado = Seguidor.destroy({
            where: {
              id: idTabelaSeguidor
            }
          });
        return res.redirect(`/perfilJogador/${perfilJogador}`)
    },
}

module.exports = perfilJogadorController;



