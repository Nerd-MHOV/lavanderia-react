const Department = require("../models/Department")

module.exports = {
    async index(req, res) {
        const department = await Department.findAll({
            include: 'collaborator'
        })
        return res.json(department)
    },

    async store(req, res) {
        const { department } = req.body

        await Department.findOrCreate({
            defaults: { department },
            where: { department }
        }).then((createDepartment) => {

            if(!createDepartment[1]){
                return res.json({
                    message:{
                        type: "alert",
                        message: "Esse departamento já existe!"
                    },
                    debug: {
                        department: createDepartment
                    }
                })
            }
            return res.json({
                message:{
                    type: "success",
                    message: "Novo departamento adicionado!"
                },
                debug: {
                    department: createDepartment
                }
            })

        }).catch((err) => {
            return res.json({
                message:{
                    type: "error",
                    message: "Houve um erro tente novamente"
                },
                debug: {
                    error: err
                }
            })
        })

    }
}