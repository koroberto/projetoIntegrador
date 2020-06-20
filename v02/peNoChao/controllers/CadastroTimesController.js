const Sequelize = require('sequelize')
const configs = require('../configs/database')
const conect = new Sequelize(configs)


const CadastroTimesController =  {
    cadastro: (req,res) => {
        return res.render('cadastroTimes');
    },

    store: async ( req, res ) =>{
        const { nome,cep } = req.body
        

        const time = await conect.query("INSERT INTO times (nome,cep) VALUES (:nome, :cep)", 
        {
            replacements:{
               nome, 
               cep,
             },
            type: Sequelize.QueryTypes.INSERT,

       }, );
       if(!time){
           return res.render('/cadastroTimes' , { msg:"erro ao cadastrar um usuario"})
       }
                
                return res.render('atleta',{msg2:"Cadastro realizado com sucesso"});
    },
    
}

module.exports = CadastroTimesController;