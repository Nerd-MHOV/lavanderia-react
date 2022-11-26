const { Model, DataTypes } = require('sequelize')

class ConfigDb extends Model {
    static init(sequelize) {
        super.init({
            config: {
                type: DataTypes.STRING,
                allowNull: false,
               
            },
            param: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false,
               
            },
            
        }, {
            sequelize,
            tableName: 'config_db'
        })
    }
}

module.exports = ConfigDb