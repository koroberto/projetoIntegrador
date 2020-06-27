const { Jogador, MidiasJogador, Seguidor, Time, MidiasTime, Postagem, Comentario, Curtida, Jogo, Evento, TipoEvento} = require("../models");
const Sequelize = require('sequelize')
const configs = require('../configs/database')
const conect = new Sequelize(configs);


const bcrypt = require ('bcrypt');

const LoginController =  {
    login: (req,res) => {

        const mensagem = req.session.msg;
        delete req.session.msg;
        res.render('login', {msg: mensagem});
    },
    store: async (req, res) => {
        const { email, password} = req.body;
        
        const [jogador] = await conect.query("SELECT * FROM jogadores WHERE email=:email limit 1",
            {
                replacements:{
                    email,
                },
                type:Sequelize.QueryTypes.SELECT,
            }
        );
        // console.log(jogador);

        if(!jogador || !bcrypt.compareSync(password,jogador.password)) {
            
            return res.render("login", {
                msg: "Email ou senha errados!",
              });
        }
        
        req.session.jogador = {
            id: jogador.id,
            nome:jogador.nome,
            email:jogador.email,
            posicaoJogador:jogador.posicaoJogador,
            dataNascimento:jogador.dataNascimento,
            sexo:jogador.sexo,
            estado:jogador.estado,
            cidade:jogador.cidade,
            bairro:jogador.bairro,
            telefone:jogador.telefone,
            cep:jogador.cep,

            path:jogador.path,
            times_id:jogador.times_id,
        };
        
        return res.redirect('/atleta')
    },
    
    sair: (req, res) => {
        req.session.jogador = "";
        return res.redirect("/");
      },

// O item consulta abaixo é somente para testes e será removido futuramente

    consulta: async(req,res) => {
        try {
            const jogadores = await Jogador.findAll();
            const times = await Time.findAll({
                include: [{
                    model: Jogador,
                    require: true
                    }]
            });
            const jogos = await Jogo.findAll({
                include: [{
                    model: Time,
                    require: true
                },{
                    model: Evento,
                    include: {
                        model: Jogador,
                        model: TipoEvento
                }},{
                    model: Jogador 
                }]
            })
            res.render('consulta', {jogadores, times, jogos});
        }
        catch(e){
            console.log(e);
        } 
    }

}
module.exports = LoginController;