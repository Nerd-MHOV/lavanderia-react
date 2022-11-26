const crypto = require('crypto');
const { fstat } = require('fs');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const User = require('../models/User');


const blacklistToken = [];

module.exports = {
    async index(req, res) {
        const users = await User.findAll();
        return res.json(users)
    },

    async store(req, res) {

        //receber paramentros
        const {
            first_name,
            last_name,
            email,
            user,
            passwd,
        } = req.body;

        // impedir senha fraca!
        if (passwd.length < 5) {
            return res.json({
                message: {
                    type: 'alert',
                    message: 'A senha deve conter ao menos 5 caracters'
                }
            });
        }

        // Encripitar a senha...
        const hash = await crypto.createHmac('sha256', process.env.CRYPTO_KEY)
            .update(passwd)
            .digest('hex')

        try {

            // verificar se ja existe e criar o user
            const [createUser, created] = await User.findOrCreate({
                defaults: {
                    first_name,
                    last_name,
                    email,
                    user,
                    passwd: hash,
                },
                where: { user }
            });

            if (!created) {
                return res.json({
                    message: {
                        type: 'error',
                        message: 'Esse usuario ja existe'
                    }
                })
            }

            return res.json({
                message: {
                    type: 'success',
                    message: 'Usuario criado com sucesso!'
                }
            });

        } catch (error) {
            return res.json({
                message: {
                    type: 'error',
                    message: error.errors[0].message
                }
            })
        }

    },

    async login(req, res) {
        const { user, passwd } = req.body;

        if (!user || !passwd) {
            return res.json({
                message: {
                    type: "error",
                    message: "Informe o usuario e a senha para logar!"
                }
            })
        }

        const hash = await crypto.createHmac('sha256', process.env.CRYPTO_KEY)
            .update(passwd)
            .digest('hex')

        
        const login = await User.findOne({ where: { user: user, passwd: hash } })


        if (!login) {
            return res.json({
                message: {
                    type: "error",
                    message: "Usuario ou Senha incorretos!"
                }
            })
        }


        //passou no login;        
        const token = jwt.sign({ user_id: login.id }, process.env.JWT_KEY, { expiresIn: '8h' })
        return res.json({
            message: {
                type: "success",
                message: "Logado com Sucesso!"
            },
            user: {
                user_id: login.id,
                token
            },
        })
    },

    async validateToken(req, res) {
        const { token } = req.body;
        const index = blacklistToken.findIndex(item => item === token);
        if(index !== -1) {
            return res.status(401).json({
                message: {
                    type: "error",
                    message: "token invalido"
                }
            })
        }
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: {
                        type: "error",
                        message: "token invalido"
                    }
                })
            }

            const user_id = decoded.user_id;

            return res.json({
                message: {
                    type: "success",
                    message: "token autorizado",
                },
                user: {
                    user_id
                }
            })
        })
    },

    async logout(req, res) {
        const { token } = req.body;

        blacklistToken.push(token);

        return res.json({
            message: {
                type: "success",
                message: "logout efetuado com sucesso",
            }
        })
    }
};