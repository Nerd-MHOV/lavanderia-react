const { Op } = require("sequelize");
const ProductType = require("../models/ProductType");

module.exports = {
    async index(req, res) {
        const types = await ProductType.findAll({
            include: 'products'
        })
        return res.json(types)
    },

    async store(req, res) {

        //receber paramentros
        const {
            type,
        } = req.body;

        try {
            // verificar se ja existe e criar
            const [create, created] = await ProductType.findOrCreate({
                defaults: {
                    type,
                },
                where: {
                    type
                }
            });

            if (!created) {
                return res.json({
                    message: {
                        type: 'error',
                        message: `${create.type} já existe`
                    }
                })
            }

            return res.json({
                message: {
                    type: 'success',
                    message: `O tipo ${create.type} foi criado!`
                }
            });

        } catch (error) {
            console.log(error)
            return res.json({
                message: {
                    type: 'error',
                    message: error.errors[0].message ? error.errors[0].message : error
                }
            })
        }

    },

    async delete(req, res) {
        const { id } = req.params;
        

        const deleted = ProductType.destroy({
            where: {id}
        })

        return res.json(deleted)
    }
}