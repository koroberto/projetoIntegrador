const Sequelize = require('sequelize')
const configs = require('../configs/database')
const mailer = require('../configs/email');
const crypto = require('crypto');
const conect = new Sequelize(configs)

const bcrypt = require ('bcrypt');

const LoginController =  {
    login: (req,res) => {
        res.render('login', {msg: req.session.msg});
        delete req.session.msg;
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
    
    sair: (req, res) => {
        req.session.jogador = "";
        return res.redirect("/");
      },

    forgotPass: async (req, res) => {
        const {email} = req.body;

        const [jogador] = await conect.query("SELECT * FROM jogadores WHERE email=:email limit 1",
            {
                replacements:{
                    email,
                },
                type:Sequelize.QueryTypes.SELECT,
            }
        );

        console.log(jogador)

        if(jogador != undefined){

            const id = jogador.id;

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            console.log(token)

            await conect.query("UPDATE jogadores SET passwordResetToken=:token, passwordResetExpires=:now WHERE id=:id",
            {
                replacements:{
                    id,
                    token,
                    now
                },
                type:Sequelize.QueryTypes.INSERT,
            }
            );

            console.log(`clicou no botao enviar email para ${jogador.email}`);
            
            let envioEmail = {
                from:'no-reply@penochao.com.br',
                to: jogador.email,
                subject: 'Reset de Senha',
                html: `<p>localhost:3000/reset_password/${token}</p>`
            }

            console.log(envioEmail);


            mailer.sendMail(envioEmail, (error) => {
                console.log("teste");
                if(error) {
                    console.log("Deu ruim");
                } else {
                    console.log("Deu bom! Email enviado com sucesso!");
                }
            })
        }   
        
        req.session.msg = "E-mail de recuperação enviado com sucesso!";
        res.redirect("/");

    },

    resetPassword_get: (req, res) => { 
        const token = req.params.token
        console.log(token)
        return res.render('reset', {token});
    },

    resetPassword_post: async ( req, res ) => {
        let { token, password } = req.body
        password = bcrypt.hashSync(password, 10);

        const [jogador] = await conect.query("SELECT * FROM jogadores WHERE passwordResetToken=:token limit 1",
            {
                replacements:{
                    token,
                },
                type:Sequelize.QueryTypes.SELECT,
            }
        );

        console.log(jogador)

        if(jogador != undefined){

            const now = new Date();
            now.setHours(now.getHours() - 3);

            if(now > jogador.passwordResetExpires){
                console.log("Token expirado");
                return res.render()
            } else {
            const id = jogador.id;

            const update = await conect.query("UPDATE jogadores SET password=:password WHERE id=:id", 
            {
                replacements:{ 
                id,
                password,
                update_at: new Date(),
                },
                type: Sequelize.QueryTypes.INSERT,
            });

        
            req.session.msg = "Senha alterada com sucesso!";
            res.redirect("/");

    }} else {
        res.send("não encontrou o token!");
    }

    },


}

module.exports = LoginController;