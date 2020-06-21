const Sequelize = require('sequelize')
const configs = require('../configs/database')
const conect = new Sequelize(configs)

const bcrypt = require ('bcrypt');  


const CadastroController =  {
    cadastro: (req,res) => {
        return res.render('cadastro');
    },

    store: async ( req, res ) =>{
        const { email,cep, sexo,
            dataNascimento, nome, posicaoJogador, estado,
            cidade, bairro, telefone } = req.body
            // console.log(estado,cidade,bairro,cep)
         let foto = 'avatarLogado.jpg' ;
         let {password} =  req.body;
        password = bcrypt.hashSync(password, 10);

        const jogador = await conect.query("INSERT INTO jogadores (nome, dataNascimento, sexo,estado, cidade, bairro,cep, telefone, posicaoJogador, email, password, path ) VALUES (:nome, :dataNascimento, :sexo, :estado, :cidade, :bairro, :cep, :telefone, :posicaoJogador, :email, :password,:path )", 
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
               path:foto ,
               create_at: new Date(),
               update_at: new Date(),
             },
            type: Sequelize.QueryTypes.INSERT,

       }, );
       if(!jogador){
           return res.render('/cadastro' , { msg:"erro ao cadastrar um usuario"})
       }
                
                return res.render('login',{msg2:"Cadastro realizado com sucesso"});
    },
    atualizar :(req, res) =>{
        return res.render('atualizacaoCadastro');

    },
    update:async (req, res )=>{
        let {cepA, sexoA, dataNascimentoA, nomeA, posicaoJogadorA, estadoA,
            cidadeA, bairroA, telefoneA } = req.body
            
        let { cep, sexo, dataNascimento, nome, posicaoJogador, estado,
                cidade, bairro, telefone ,id , path} = res.locals.jogador 
        let [foto] = req.files;
        console.log("---------------------------",foto)
    // console.log(`dataNascimento->${dataNascimento},dataNascimentoA-> ${dataNascimentoA}`)
    

        nome = nomeA != "" ? nomeA : nome ;
        cep = cepA != "" ? cepA : cep ;
        sexo = sexoA != "" ? sexoA : sexo ;
        dataNascimento = dataNascimentoA != "" ? dataNascimentoA : dataNascimento.replace( "Z","") ;
        posicaoJogador = posicaoJogadorA != "" ? posicaoJogadorA : posicaoJogador ;
        estado = estadoA != "" ? estadoA : estado ;
        cidade = cidadeA != "" ? cidadeA : cidade ;
        bairro = bairroA != "" ? bairroA : bairro ;
        telefone = telefoneA != "" ? telefoneA : telefone ;
        // campo photo_id(interger ) chave estrangeira por isso nao implementei atualizacao de foto a foto 
        // 
         foto  = foto != undefined ? foto.filename : path ;
          console.log(dataNascimento,dataNascimentoA)
        // ,photo_id=:photo_id

const jogador = await conect.query(" UPDATE jogadores SET nome=:nome, sexo=:sexo, estado=:estado, cidade=:cidade, bairro=:bairro, cep=:cep, telefone=:telefone, posicaoJogador=:posicaoJogador, dataNascimento=:dataNascimento, path=:path WHERE id = :id" ,
        {
            replacements:{
                id,
               nome, 
               sexo,
               estado, 
               cidade,
               bairro, 
               dataNascimento,
               cep,
               telefone,
               posicaoJogador,  
               path: foto,
               
             },
            type: Sequelize.QueryTypes.UPDATE,

       }, );
       
    //    return res.redirect('atleta');
       return res.redirect('/atleta')
       

       
    }

}

module.exports = CadastroController;