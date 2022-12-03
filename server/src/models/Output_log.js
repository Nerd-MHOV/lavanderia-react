const { Model, DataTypes } = require('sequelize')

class Output_log extends Model {
    static init(sequelize) {
        super.init({
            amount: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
            obs: DataTypes.STRING,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.Product, {foreignKey: 'product_id', as: 'product'})
        this.belongsTo(models.Collaborator, {foreignKey: 'collaborator_id', as: 'collaborator'})
        this.belongsTo(models.Collaborator, {foreignKey: 'responsible_id', as: 'responsible'})
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
    }

}

module.exports = Output_log