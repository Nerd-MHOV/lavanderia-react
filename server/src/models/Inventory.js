const { Model, DataTypes } = require('sequelize')

class Inventory extends Model {
    static init(sequelize) {
        super.init({
            amount: DataTypes.INTEGER,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.Product, {foreignKey: 'product_id', as: 'product'})
    }

}

module.exports = Inventory