const { Jogador, MidiasJogador, Time, MidiasTime} = require("../models");

const TimesController =  {
    index: async(req,res) => {

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
            return res.render('times', {times} );
        }
        catch(error){
            console.log(error);
        }
        
        
    }
}

module.exports = TimesController;