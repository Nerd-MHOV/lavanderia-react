const Collaborator = require('../models/Collaborator')
const CPF = require('cpf-cnpj-validator')
const { findAll } = require('../models/Collaborator')
const { Op } = require('sequelize')
const Output = require('../models/Output')

module.exports = {
    async index(req, res) {
        const collaborator = await Collaborator.findAll({where: {id: {[Op.not]: '0'}}, include: 'department'})
        return res.json(collaborator)
    },

    async indexPk(req, res) {
        const {id} = req.params
        const collaborator = await Collaborator.findByPk(id)   
        return res.json(collaborator)
    },

    async debit (req, res) {
        const collaborator = await Collaborator.findAll({
            include: [
                {
                    association: "debit", required: true,
                    include: [
                        { association: "responsible" }, { 
                            association: "product", include:[
                                {association: "type"}, {association: "service"} , {association: "department"}
                            ]
                        }
                    ]
                },{
                    association: "department"
                }
            ]
        })
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
    },

    async fingerPrintFind(req, res) {
        const { fingerId } = req.params;

        if(!fingerId || fingerId === undefined || fingerId === 'undefined') {
            return res.json({
                message:{
                    type: 'error',
                    message: 'Digital não encontrada tente de novo'
                }
            });
        }

        const response = await Collaborator.findOne({
            where: { fingerprint: fingerId }
        })

        return res.json(response)
    },

    async pendentRetreats(req, res) {
        const {id} = req.params

        const collaborator = await Collaborator.findByPk(id, {
            include: [
                {
                    association: "debit", required: true,
                    include: [
                        { association: "responsible" }, { 
                            association: "product", include:[
                                {association: "type"}, {association: "service"} , {association: "department"}
                            ]
                        }
                    ]
                },{
                    association: "department"
                }
            ]
        })
        return res.json(collaborator)
    },


    async update(req, res) {
        const {
            id,
            department_id,
            collaborator,
            cpf,
            mensalista,
            active,
            fingerprint

        } = req.body;


        try {
            const response = await Collaborator.update({
                department_id,
                collaborator,
                cpf,
                mensalista,
                active,
                fingerprint,
            },{
                where: {id}
            })

            return res.json({message:{
                message: "Usuario atualizado com sucesso!",
                type: "success",
                debug: response
            }})
        } catch (error) {
            console.log(error)
            return res.json({message: {
                message: "Erro, tente novamente",
                type: "error",
                debug:error
            }})
        }

        
        return null


    }


}