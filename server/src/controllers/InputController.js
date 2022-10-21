const Input = require("../models/Input");


module.exports = {
    async index(req, res) {
        const inputs = await Input.findAll()
        return res.json(inputs)
    },

    async store(req, res) {
        const { product_id, amount } = req.body;


        const createInput = await Input.create({
            product_id, amount
        })

        createInput.save()
        return res.json(createInput)
    },


    async delete(req, res) {
        const { id } = req.params;

        const deleteInput = await Input.destroy({
            where: { id }
        })

        return res.json(deleteInput)
    },
}