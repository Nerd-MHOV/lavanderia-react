const { Model, DataTypes } = require('sequelize')

class ProductService extends Model {
    static init(sequelize) {
        super.init({
            service: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'product_services'
        })
    }

    static associate(models) {
        this.hasMany(models.Product, { foreignKey: 'product_service_id', as: 'products' })
    }
}

module.exports = ProductService