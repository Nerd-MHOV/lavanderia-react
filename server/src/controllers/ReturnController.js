const Output = require("../models/Output");
const Return = require("../models/Return");


module.exports = {
    async index(req, res) {
        const inputs = await Return.findAll({
            include: [
                {
                    association: "product",
                    include: [
                        {association: 'department'},
                        {association: 'type'},
                        {association: 'service'}
                    ]
                },
                {
                    association: 'responsible_in',
                    include: 'department'
                },
                {
                    association: 'responsible_out',
                    include: 'department'
                }
            ]
        })
        return res.json(inputs)
    },

    async store(req, res) {
        const { output_id, responsible_out_id, user_id, amount_return, amount_bad, status_out, obs_out } = req.body;

        const findOutput = await Output.findByPk(output_id)
        const timestamp = new Date().getTime();

        if (findOutput === null) {
            return res.json({error: "error", msg: "saida não encontrada"});
        }
        

        const saveReturns = await Return.create({
            collaborator_id: findOutput.collaborator_id,
            responsible_in_id: findOutput.responsible_id,
            responsible_out_id,
            user_id,
            product_id: findOutput.product_id,
            amount_has: findOutput.amount,
            amount: amount_return,
            amount_bad,
            status_in: findOutput.status,
            status_out,
            obs_in: findOutput.obs,
            obs_out,
            date_in: findOutput.createdAt,
            date_out: timestamp,

        });

        const newamount = findOutput.amount - saveReturns.amount;
        if (newamount == 0) {
            await Output.destroy({where: {id: output_id} ,individualHooks: true});
        }else {
            await Output.update({amount: newamount},{where: {id:output_id}, individualHooks: true})
        }
        saveReturns.save();
       return res.json(saveReturns)
    },



    async fingerPrintReturn (req, res) {
        const { 
            output_id, 
            responsible_out_id, 
            user_id, 
            amount_return, 
            amount_bad, 
            obs_out } = req.body;

        const findOutput = await Output.findByPk(output_id)
        const timestamp = new Date().getTime();



        if (!findOutput) {
            return res.json({
                message: {type: "error", message: "saida não encontrada"}
            });
        }


        // O MESMO DONO DA RETIRADA DEVE SER O DA DEVOLUÇÂO!
        // if (findOutput.collaborator_id !== 0 && findOutput.responsible_in_id !== responsible_out_id) {
        //     return res.json({
        //         message: { type: "Alert", message: "Quem fez a retirada deve devolver!"}
        //     })
        // }

        if (!user_id) {
            return res.json({
                message: {type: "error", message: "Necessario estar logado com uma conta!"}
            });
        }

        if (amount_return < 1) {
            return res.json({
                message: {type: "error", message: "Você precisa devolver ao menos 1 item"}
            });
        }
        

        const status_out = (amount_bad > 0) ? false : true ;

        const saveReturns = await Return.create({
            collaborator_id: findOutput.collaborator_id,
            responsible_in_id: findOutput.responsible_id,
            responsible_out_id,
            user_id,
            product_id: findOutput.product_id,
            amount_has: findOutput.amount,
            amount: amount_return,
            amount_bad,
            status_in: findOutput.status,
            status_out,
            obs_in: findOutput.obs,
            obs_out,
            date_in: findOutput.createdAt,
            date_out: timestamp,

        });

        const newamount = findOutput.amount - saveReturns.amount;
        if (newamount == 0) {
            await Output.destroy({where: {id: output_id} ,individualHooks: true});
        }else {
            await Output.update({amount: newamount},{where: {id:output_id}, individualHooks: true})
        }
        saveReturns.save();

        return res.json({
            message: {
                type: "success",
                message: `Devolvido ${amount_return} unid. com sucesso!`
            }
        })
    }

}