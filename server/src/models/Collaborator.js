const { Model, DataTypes } = require('sequelize')

class Collaborator extends Model {
    static init(sequelize) {
        super.init({
            collaborator: DataTypes.STRING,
            cpf: DataTypes.STRING,
            mensalista: DataTypes.BOOLEAN,
            active: DataTypes.BOOLEAN,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.Department, { foreignKey: 'department_id', as:'department'})
    }
}

module.exports = Collaborator