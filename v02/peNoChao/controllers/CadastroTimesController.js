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
    

        try{
            const time = await Time.create({
                nome: nome,
                cep: cep,
                MidiasTimes: [ 
                    { timestamp: now, 
                      path: midia.filename 
                    },
                ],
            },{
                include: [MidiasTime]
            });
            
            console.log(time.id);

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
            return res.render("atualizacaoCadastroTime", { time,idCapitao });
        }
        catch(error){
            return res.send("Error");
        }

        return res.send("Editar o time" + idTime);

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
                MidiasTimes: [ 
                    { timestamp: now, 
                      path: novoEscudo 
                    },
                ],
            },{ where: { id: id }},{
                include: [MidiasTime]
            },
            ) 
            
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
    }
    
}

module.exports = CadastroTimesController;