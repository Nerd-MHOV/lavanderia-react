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

        const [ createDepartment ] = await Department.findOrCreate({
            defaults: { department },
            where: { department }
        })

        return res.json(createDepartment)
    }
}