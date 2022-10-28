const { Model, DataTypes } = require('sequelize');
const Output = require('./Output');

class Return extends Model {
    static init(sequelize) {
        super.init({
            amount_has: DataTypes.INTEGER,
            amount: DataTypes.INTEGER,
            amount_bad: DataTypes.INTEGER,
            status_in: DataTypes.BOOLEAN,
            status_out: DataTypes.BOOLEAN,
            obs_in: DataTypes.STRING,
            obs_out: DataTypes.STRING,
            date_in: DataTypes.DATE,
            date_out: DataTypes.DATE,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.Product, {foreignKey: 'product_id', as: 'product'})
        this.belongsTo(models.Collaborator, {foreignKey: 'collaborator_id', as: 'Collaborator'})
        this.belongsTo(models.Collaborator, {foreignKey: 'responsible_in_id', as: 'responsible_in'})
        this.belongsTo(models.Collaborator, {foreignKey: 'responsible_out_id', as: 'responsible_out'})
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
    }

}

module.exports = Return