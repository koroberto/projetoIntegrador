const { Curtida } = require("../models");
const Sequelize = require('sequelize')
const configs = require('../configs/database');
const conect = new Sequelize(configs)

const likeController =  {

    store:async (req,res) => {
        
        const { jogador_id, postagens_id } = req.body
        
        console.log(jogador_id, postagens_id)

        try{
            const curtida = await Curtida.create({
                jogadores_id: jogador_id,
                postagens_id:postagens_id,
            },);
            return res.redirect("/atleta");
        }
        catch(error){
            console.log(error);
            return res.send(error);
        }
 
        
    },
}

module.exports = likeController;