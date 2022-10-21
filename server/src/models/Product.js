const { Model, DataTypes } = require('sequelize')

class Product extends Model {
    static init(sequelize) {
        super.init({
            product: DataTypes.STRING,
            size: DataTypes.STRING,
            unitary_value: DataTypes.STRING,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.Department, {foreignKey: 'department_id', as: 'department'})
        this.belongsTo(models.ProductType, { foreignKey: 'product_type_id', as:'type'})
        this.belongsTo(models.ProductService, { foreignKey: 'product_service_id', as:'service'})
    }
}

module.exports = Product