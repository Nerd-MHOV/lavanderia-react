const { Model, DataTypes } = require('sequelize')

class ProductType extends Model {
    static init(sequelize) {
        super.init({
            type: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'product_types'
        })
    }

    static associate(models) {
        this.hasMany(models.Product, { foreignKey: 'product_type_id', as: 'products' })
    }
}

module.exports = ProductType