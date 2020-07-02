const { Jogador, MidiasJogador, Time, MidiasTime} = require("../models");

const TimesController =  {
    index: async(req,res) => {
        const idLogado = req.session.jogador.id;
        try{
            const times = await Time.findAll({
                include: [{
                    model: Jogador,
                    require: true
                },{
                    model: MidiasTime,
                    require: true,
                }]
            });
            return res.render('times', {times, idLogado} );
        }
        catch(error){
            console.log(error);
        }
    },
    ingressar: async(req,res) => {

        try{
            await Jogador.update({
                times_id: req.params.id,
            },{ where: {id: req.session.jogador.id}}
        )   
            
         return res.redirect("/times");
    
        } catch(error){
            return res.send(error);
        }
    },
    exibir: async (req, res) => {
        const { id } = req.params;
        const idLogado = req.session.jogador.id;

        try {
            let times = [];
            const time = await Time.findByPk(id, {
                include: [{
                    model: Jogador,
                    require: true
                },{
                    model: MidiasTime,
                    require: true,
                }]})

            times.push(time);
            return res.render('times', {times, idLogado} );

        } catch (error) {
            return res.send(error);
        }

        
    }
}

module.exports = TimesController;