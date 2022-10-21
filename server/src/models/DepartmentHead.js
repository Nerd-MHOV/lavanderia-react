const { Model, DataTypes } = require('sequelize')

class DepartmentHead extends Model {
    static init(sequelize) {
        super.init({
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Informe seu nome!'
                    },
                    len: {
                        args: [3, 30],
                        msg: 'Informe seu nome!'
                    }
                },
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Informe seu sobrenome!'
                    },
                    len: {
                        args: [3, 30],
                        msg: 'Informe seu sobrenome!'
                    }
                },
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        msg: "Informe um e-mail valido!"
                    }
                }
            },
            cel: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'department_heads'
        })
    }

    static associate(models) {
        this.belongsTo(models.Department, { foreignKey: 'department_id', as:'department'})
    }
}

module.exports = DepartmentHead