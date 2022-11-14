const { Op } = require("sequelize");
const ProductService = require("../models/ProductService");

module.exports = {
    async index(req, res) {
        const types = await ProductService.findAll({
            include: 'products'
        })
        return res.json(types)
    },

    async store(req, res) {

        //receber paramentros
        const {
            service,
        } = req.body;

        try {
            // verificar se ja existe e criar
            const [create, created] = await ProductService.findOrCreate({
                defaults: {
                    service 
                },
                where: {
                    service
                }
            });

            if (!created) {
                return res.json({
                    message: {
                        type: 'error',
                        message: 'Esse "oficio" já esta em rotação'
                    }
                })
            }

            return res.json({
                message: {
                    type: 'success',
                    message: 'Um novo "oficio" para produto foi adicionado!'
                }
            });

        } catch (error) {
            console.log(error)
            return res.json({
                message: {
                    type: 'error',
                    message: "erro tente novamente",
                    debug: error.toString()
                }
            })
        }

    },
}