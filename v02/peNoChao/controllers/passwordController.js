const { Jogador } = require("../models");
const mailer = require('../configs/email');
const crypto = require('crypto');
const moment = require('moment');

const bcrypt = require ('bcrypt');

const PasswordController =  {
    forgotPass: async (req, res) => {
        const { email } = req.body;

        const jogador = await Jogador.findOne({ where: {email: email}});

        if(jogador != undefined){

            const id = jogador.id;

            const token = crypto.randomBytes(20).toString('hex');

            const now = moment();
            now.hour(now.hour() + 1);

            console.log("HERE: " + now.format());

            try{
                await Jogador.update({
                    passwordResetToken: token,
                    passwordResetExpires: now.format() 
                },{ where: {id: id}}
            )
                let envioEmail = {
                    from:'no-reply@penochao.com.br',
                    to: jogador.email,
                    subject: 'Reset de Senha',
                    html: `<p>localhost:3000/reset_password/${token}</p>`
                }
                mailer.sendMail(envioEmail, (error) => {
                    console.log("teste");
                    if(error) {
                        console.log("Deu ruim");
                    } else {
                        console.log("Deu bom! Email enviado com sucesso!");
                    }   
                })

                req.session.msg = "E-mail de recuperação enviado com sucesso!";
                return res.redirect("/");


            } catch(e){
                console.log(e);
                req.session.msg = "Erro no Banco de Dados!";
                return res.redirect("/");
            }
           
        } else {
            req.session.msg = "E-mail não cadastrado!";
            return res.redirect("/");
        }
        
        

    },

    resetPassword_get: async (req, res) => { 

        const token = req.params.token;

        const jogador = await Jogador.findOne(
            { where: 
                { passwordResetToken: token } 
            });

        if(jogador != undefined){

            const tokenExpiration = new moment(jogador.passwordResetExpires).format();
            const now = moment().format();

            if(now > tokenExpiration){
                req.session.msg = "Token Expirado!";
                return res.redirect("/");
            } else {
            return res.render('reset', {token});
        } 
        }   else {
            req.session.msg = "Token Inválido!";
            return res.redirect("/");
    }

},

    resetPassword_post: async ( req, res ) => {

        let { token, password } = req.body
        password = bcrypt.hashSync(password, 10);

        const jogador = await Jogador.findOne(
            { where: 
                { passwordResetToken: token } 
            });

        if(jogador != undefined){

            const tokenExpiration = new moment(jogador.passwordResetExpires).format();
            const now = moment().format();

            if(now > tokenExpiration)
            {
                req.session.msg = "Token Expirado!";
                return res.redirect("/");
            } else {
                const id = jogador.id;

                try{
                    Jogador.update(
                        { password: password, 
                          passwordResetToken: null,
                        },

                        { where: {id: id}, }
                    )
                    req.session.msg = "Senha alterada com sucesso!";
                    return res.redirect("/");
                } catch(e){
                    console.log(e);
                }
            }
        } else {
            req.session.msg = "Falha ao redefinir a senha!";
            return res.redirect("/");
        }
    },

}
module.exports = PasswordController;