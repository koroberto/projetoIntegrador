const Sequelize = require('sequelize')
const configs = require('../configs/database')
const conect = new Sequelize(configs)

const bcrypt = require ('bcrypt');  


const CadastroController =  {
    cadastro: (req,res) => {
        return res.render('cadastro');
    },

    store: async ( req, res ) =>{
        const { email,cep, senhaConfirmacao, sexo,
            dataNascimento, nome, posicaoJogador, estado,
            cidade, bairro, telefone } = req.body
         let {password} =  req.body;
        password = bcrypt.hashSync(password, 10);

        const jogador = await conect.query("INSERT INTO jogadores (nome, dataNascimento, sexo,estado, cidade, bairro,cep, telefone, posicaoJogador, email, password ) VALUES (:nome, :dataNascimento, :sexo, :estado, :cidade, :bairro, :cep, :telefone, :posicaoJogador, :email, :password )", 
        {
            replacements:{
               nome, 
               dataNascimento,
               sexo,
               estado, 
               cidade,
               bairro, 
               cep,
               telefone,
               posicaoJogador,
               email, 
               password,
               create_at: new Date(),
               update_at: new Date(),
             },
            type: Sequelize.QueryTypes.INSERT,

       }, );
       if(!jogador){
           return res.render('/cadastro' , { msg:"erro ao cadastrar um usuario"})
       }
                
                return res.render('login');
    },
}

module.exports = CadastroController;