const Collaborator = require('../models/Collaborator')
const CPF = require('cpf-cnpj-validator')
const { findAll } = require('../models/Collaborator')

module.exports = {
    async index(req, res) {
        const collaborator = await Collaborator.findAll()
        return res.json(collaborator)
    },

    async store(req, res) {
        const { department_id, collaborator, cpf, mensalista } = req.body;

        const isValid = CPF.cpf.isValid(cpf)
        const cpf_formated = CPF.cpf.format(cpf);

        if(!isValid) {
            return res.json({
                message: {
                    type: "error",
                    message: "C.P.F. invalido!"
                }
            })
        }

        const [ createCollaborator ] = await Collaborator.findOrCreate({
            defaults: {
                department_id,
                collaborator,
                cpf,
                mensalista,
                active: true,
            },
            where: {
                cpf
            }
        })

        return res.json(createCollaborator)
    },

    async department(req, res) {
        const { department } = req.params;

        const response = Collaborator.findAll({
            where: {
                department_id: {
                    [Op.or]: [department, 0]
                }
            }
        })

        return res.json(response)
    }
}