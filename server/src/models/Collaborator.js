const { Model, DataTypes } = require('sequelize')

class Collaborator extends Model {
    static init(sequelize) {
        super.init({
            collaborator: DataTypes.STRING,
            cpf: DataTypes.STRING,
            mensalista: DataTypes.BOOLEAN,
            active: DataTypes.BOOLEAN,
            fingerprint: DataTypes.INTEGER,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department'})
        this.hasMany(models.Output, { foreignKey: 'collaborator_id', as: 'debit' })
    }
}

module.exports = Collaborator