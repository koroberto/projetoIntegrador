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

            const now = new moment();
            now.hour(now.hour() + 1);

            try{
                Jogador.update({
                    passwordResetToken: token,
                    passwordResetExpires: now.format() 
                },{ where: {id: id}}
            )} catch(e){
                console.log(e);
            }

            
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
        } else {
            req.session.msg = "E-mail não cadastrado!";
            res.redirect("/");
        }
        
        req.session.msg = "E-mail de recuperação enviado com sucesso!";
        res.redirect("/");

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
                res.redirect("/");
            } else {
            return res.render('reset', {token});
        } 
        }   else {
            req.session.msg = "Token Inválido!";
            res.redirect("/");
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
                res.redirect("/");
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
                    res.redirect("/");
                } catch(e){
                    console.log(e);
                }
            }
        } else {
            req.session.msg = "Falha ao redefinir a senha!";
            res.redirect("/");
        }
    },

}
module.exports = PasswordController;