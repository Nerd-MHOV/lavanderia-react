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
            product_type,
        } = req.body;

        try {
            // verificar se ja existe e criar
            const [create, created] = await ProductType.findOrCreate({
                defaults: {
                    type: product_type,
                },
                where: {
                    type: product_type
                }
            });

            if (!created) {
                return res.json({
                    message: {
                        type: 'error',
                        message: 'Esse "tipo" de produto ja existe'
                    }
                })
            }

            return res.json({
                message: {
                    type: 'success',
                    message: 'Um novo "tipo" de produto foi adicionado!'
                }
            });

        } catch (error) {
            console.log(error)
            return res.json({
                message: {
                    type: 'error',
                    message: error
                }
            })
        }

    },
}