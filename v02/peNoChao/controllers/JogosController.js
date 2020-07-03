const { Jogador, Time } = require("../models");

const JogosController =  {
    index: async(req,res) => {

        const idLogado = req.session.jogador.id;

        try{
            const times = await Time.findAll();

            const timeDaCasa = times.find((time) => time.jogadores_id == idLogado);

            console.log(timeDaCasa.nome);

            return res.render('jogos', { times, timeDaCasa });

        } catch (error) {

            console.log(error);
            return res.send(error);

        }


        
    }
}

module.exports = JogosController;