const { Model, DataTypes } = require('sequelize')

class Department extends Model {
    static init(sequelize) {
        super.init({
            department: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Collaborator, { foreignKey: 'department_id', as: 'collaborator' })
    }
}

module.exports = Department