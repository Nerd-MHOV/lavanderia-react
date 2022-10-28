const Output = require("../models/Output");
const Return = require("../models/Return");


module.exports = {
    async index(req, res) {
        const inputs = await Return.findAll()
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

}