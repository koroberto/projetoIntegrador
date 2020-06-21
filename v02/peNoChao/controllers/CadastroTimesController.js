const { Time, MidiasTime } = require("../models");
const Sequelize = require('sequelize')
const configs = require('../configs/database');
const conect = new Sequelize(configs)


const CadastroTimesController =  {
    cadastro: (req,res) => {
        return res.render('cadastroTimes');
    },

    store: async ( req, res ) =>{
        const [midia] = req.files;
        const { nome,cep } = req.body
        const now = new Date();
    

        try{
            const time = await Time.create({
                nome: nome,
                cep: cep,
                MidiasTimes: [ 
                    { timestamp: now, 
                      path: midia.filename 
                    },
                ]
            },{
                include: [MidiasTime]
            });
            return res.redirect("times");
        }
        catch(error){
            console.log(error);
            return res.send(error);
        }
    }
    
}

module.exports = CadastroTimesController;