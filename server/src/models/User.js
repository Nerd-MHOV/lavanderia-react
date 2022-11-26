const { Model, DataTypes } = require('sequelize')

class User extends Model {
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
            user: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Informe seu usuario!'
                    },
                    len: {
                        args: [3, 30],
                        msg: 'Informe seu usuario!'
                    }
                },
            },
            passwd: {
                type: DataTypes.STRING,
            },
            level: DataTypes.INTEGER,
            photo: DataTypes.STRING,
            forget: DataTypes.STRING
        }, {
            sequelize
        })
    }

    // static associate(models) {
    //     this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' })
    //     this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as:'techs'})
    // }
}

module.exports = User