const { Time, MidiasTime, Jogador } = require("../models");
const Sequelize = require('sequelize')
const configs = require('../configs/database');
const conect = new Sequelize(configs)


const CadastroTimesController =  {
    cadastro: (req,res) => {
        const idCapitao = req.session.jogador.id;
        return res.render('cadastroTimes', { idCapitao } );
    },

    store: async ( req, res ) =>{
        const [midia] = req.files;
        const { nome,cep, idCapitao } = req.body
        const now = new Date();

        let file;

        if(midia != undefined){
            file = midia.filename;
        } else {
            file = 'logo_200x200.png'
        }

        try{
            const time = await Time.create({
                nome: nome,
                cep: cep,
                jogadores_id: idCapitao,
                MidiasTimes: [ 
                    { timestamp: now, 
                      path: file 
                    },
                ],
            },{
                include: [MidiasTime]
            });
            
            // console.log(time.id);

            try {
                const jogador = await Jogador.update({
                    times_id: time.id,
                },{ where: {id: idCapitao}}
                )
            } catch(error){
                console.log(error);
                return res.send(error);
            }


            return res.redirect("/atleta");


        }
        catch(error){
            console.log(error);
            return res.send(error);
        }
        

    },

    editar: async(req, res) => {
        const idCapitao = req.session.jogador.id;
        const idTime = req.params.id;

        try{
        const time = await Time.findByPk(idTime, {
            include: [{
                        model: MidiasTime,
                        require: true
            }]
        });
            return res.render("atualizacaoCadastroTime", { time, idCapitao });
        }
        catch(error){
            return res.send("Error");
        }

        // return res.send("Editar o time" + idTime);

    },

    atualizar: async(req, res) => {
        const [midia] = req.files;
        const { nome,cep,escudoAtual } = req.body
        const { id } = req.params;
        const now = new Date();
        let novoEscudo = escudoAtual;

        console.log(midia);

        console.log(novoEscudo)

        if(midia != undefined){
            console.log("\n\n\n" + midia.filename + "\n\n\n\n");
            novoEscudo = midia.filename;
        } 
            
        try{
            const time = await Time.update({
                nome: nome,
                cep: cep,
               },{ where: { id: id }},
            )
            
            try {
                const midia = await MidiasTime.update({
                    path: novoEscudo,
                },{ where: {times_id: id}}
                )
            } catch(error){
                console.log(error);
                return res.send(error);
            }
            
            // console.log(time);

            // try {
            //     const jogador = await Jogador.update({
            //         times_id: time.id,
            //     },{ where: {id: idCapitao}}
            //     )
            // } catch(error){
            //     console.log(error);
            //     return res.send(error);
            // }


            return res.redirect("/atleta");


        }
        catch(error){
            console.log(error);
            return res.send(error);
        }
    },
    
}

module.exports = CadastroTimesController;