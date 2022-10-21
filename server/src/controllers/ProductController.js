const { Op } = require("sequelize");
const Product = require("../models/Product");

module.exports = {
    async index(req, res) {
        const products = await Product.findAll({
            include: [
                {association: 'department', attributes: ['id', 'department']},
                {association: 'type', attributes: ['id', 'type']},
                {association: 'service', attributes: ['id', 'service']},
            ],
            attributes: ['id','product','size','unitary_value','updated_at']
        })
        return res.json(products)
    },

    async store(req, res) {

        //receber paramentros
        const {
            department,
            type,
            service,
            product,
            size,
            unitary_value,
        } = req.body;

        try {
            // verificar se ja existe e criar
            const [create, created] = await Product.findOrCreate({
                defaults: {
                    department_id: department,
                    product_type_id: type,
                    product_service_id: service,
                    product,
                    size,
                    unitary_value,
                },
                where: {
                    [Op.and]: [
                        {product},
                        {product_type_id: type},
                        {product_service_id: service}
                    ]
                }
            });

            if (!created) {
                return res.json({
                    message: {
                        type: 'error',
                        message: 'Esse produto ja existe'
                    }
                })
            }

            return res.json({
                message: {
                    type: 'success',
                    message: 'Um novo produto foi adicionado!'
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