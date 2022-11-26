const DepartmentHead = require("../models/DepartmentHead")
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        const heads = await DepartmentHead.findAll({
            include: 'department'
        })
        return res.json(heads)
    },

    async store(req, res) {

        //receber paramentros
        const {
            first_name,
            last_name,
            email,
            cel,
            department_id,
        } = req.body;

        try {
            // verificar se ja existe e criar o chefe
            const [createHead, created] = await DepartmentHead.findOrCreate({
                defaults: {
                    department_id,
                    first_name,
                    last_name,
                    email,
                    cel,
                },
                where: {
                    [Op.or]: [
                        {email},
                        {cel}
                    ]
                }
            });

            if (!created) {
                return res.json({
                    message: {
                        type: 'error',
                        message: 'E-mail ou Celular ja cadastrados'
                    }
                })
            }

            return res.json({
                message: {
                    type: 'success',
                    message: 'Chefe vinculado com sucesso!'
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