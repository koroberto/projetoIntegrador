const Sequelize = require('sequelize')
const configs = require('../configs/database')
const conect = new Sequelize(configs)

const bcrypt = require ('bcrypt');

const LoginController =  {
    login: (req,res) => {
        return res.render('login');
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
        console.log(jogador)

        if(!jogador || !bcrypt.compareSync(password,jogador.password)) {
            
            return res.render("login", {
                msg: "Email ou senha errados!",
              });
        }
        req.session.jogador = {
            id: jogador.id,
            name:jogador.nome,
            email:jogador.email
        };
        return res.redirect('/atleta')
    },
    
    // destroy: (req, res) => {
    //     req.session = undefined;
    //     return res.redirect("/login");
    //   },
}

module.exports = LoginController;