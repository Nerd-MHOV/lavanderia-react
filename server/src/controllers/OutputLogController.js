const { Op } = require("sequelize");
const Output_log = require("../models/Output_log");

module.exports = {
    async index(req, res) {
        await Output_log.findAll({
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
                    association: 'responsible',
                    include: 'department'
                }
            ], order: [
                ['updatedAt', 'DESC']
            ]
        }).then((outputs) => {

            return res.json(outputs)

        
        }).catch((err) => {return res.json(
            {debug: err}
        )})
    },
}