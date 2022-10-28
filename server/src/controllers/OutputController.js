const { Op } = require("sequelize");
const Output = require("../models/Output");
const Inventory = require("../models/Inventory");

module.exports = {
    async index(req, res) {
        const inputs = await Output.findAll({
            include: [
                {
                    association: "product"
                },
                {
                    association: "responsible"
                }
            ]
        })
        return res.json(inputs)
    },

    async store(req, res) {
        const { collaborator_id, responsible_id, user_id, product_id, amount, status, obs } = req.body;


        const createdOutput = await Output.create({
            collaborator_id, responsible_id, user_id, product_id, amount, status, obs
        })

        createdOutput.save()
        return res.json(createdOutput)
    },


    async delete(req, res) {
        const { id } = req.params;

        const deletedOutput = await Output.destroy({
            where: { id }, individualHooks: true,
        })

        return res.json(deletedOutput)
    },

    async update(req, res) {
        const { id, amount } = req.body;

        const updatedOutput = await Output.update({amount},{
            where: {id}, individualHooks: true,
        })

        return res.json(this.updatedOutput)
    },

    async retreat(req, res) {
        const {arr} = req.body;
        if(!arr.user_id) {
            return res.json({
                message: {
                    type: "error",
                    message: "É necessario estar logado para fazer retiradas!"
                }
            })
        }

        if (
            !arr.collaborator ||
            !arr.products.sizes ||
            arr.products.sizes.length !== arr.products.products.length ||
            arr.products.sizes.length !== Number(arr.num_retreat)
        ) {
            return res.json({
                message: {
                    type: "error",
                    message: "É necessario informar todos os campos para a retirada!"
                }
            })
        }


        try{
                arr.products.products.forEach(async (prod, index) => {
                    //checar estoque
                    let checkInventory = Inventory.findOne({where: {product_id: arr.products.sizes[index] }, include: "product"})
                    if (checkInventory.amount < arr.products.quantities[index]) {
                        return res.json({
                            message: {
                                type: "alert",
                                message: `Há apenas ${checkInventory.amount} unidades do ${checkInventory.product.product}`
                            }
                        })
                    }

                    let createdOutput = await Output.findOne({
                        where: {
                            [Op.and]: [{product_id: arr.products.sizes[index]}, {collaborator_id: "0"}]
                        }
                    })
    
                    if (createdOutput) {
                        try {
                            await createdOutput.update({
                                responsible_id: arr.responsible,
                                amount: (Number(createdOutput.amount) + Number(arr.products.quantities[index]))
                            }, {
                                where: {
                                    [Op.and]: [{product_id: arr.products.sizes[index]}, {collaborator_id: 0}]
                                }
                            });
                        } catch (err) {
                            return res.json({
                                message: {
                                    type: "error",
                                    message: err.message,
                                }
                            })
                        }
                        
                    } else {
                        try {
                            const createOutput = await Output.create({
                                collaborator_id: arr.collaborator,
                                responsible_id: arr.responsible || arr.collaborator, 
                                user_id: arr.user_id, 
                                product_id: arr.products.sizes[index], 
                                amount: arr.products.quantities[index], 
                                status: 1, 
                                obs: "",
                            })
    
                        await createOutput.save()
                        } catch (err) {
                            return res.json({
                                message: {
                                    type: "error",
                                    message: err.message,
                                }
                            })
                        }
                    }
                    
                });

            return res.json({
                message: {
                    type: "success",
                    message: "Retirada efetuada com sucesso!"
                }
            });

        }catch (err) {
            return res.json({
                message: {
                    type: "error",
                    message: "Algo deu errado, prencha todos os campos adequadamente e tente novamente!"
                }
            })
        }
        

       
    },


    async retreatFinger(req, res) {
        const {form, collaborator} = req.body;
        if(!form.user_id) {
            return res.json({
                message: {
                    type: "error",
                    message: "É necessario estar logado para fazer retiradas!"
                }
            })
        }

        if (
            !form.finality
            || !form.num_retreat
            || form.num_retreat <= 0
            || (!form.products.products || form.products.products.length !== Number(form.num_retreat))
            || (!form.products.sizes || form.products.sizes.length !== Number(form.num_retreat))
            || form.products.quantities.includes('0')
        ) {
            return res.json({
                message: {
                    type: "error",
                    message: "É necessario informar todos os campos para a retirada!"
                }
            })
        }

        form.products.products.forEach(async (prod, index) => {
            //checar estoque
            let checkInventory = await Inventory.findOne({where: {product_id: form.products.sizes[index] }, include: "product"})
            console.log(checkInventory.amount < Number(form.products.quantities[index]))
            if (Number(checkInventory.amount) < Number(form.products.quantities[index])) {
                return res.json({
                    message: {
                        type: "alert",
                        message: `Há apenas ${checkInventory.amount} unidades do ${checkInventory.product.product}`
                    }
                })
            }
        })

        try{
                form.products.products.forEach(async (prod, index) => {

                    let createdOutput = await Output.findOne({
                        where: {
                            [Op.and]: [{product_id: form.products.sizes[index]}, {collaborator_id: "0"}]
                        }
                    })
    
                    if (createdOutput) {
                        try {
                            await createdOutput.update({
                                responsible_id: collaborator,
                                amount: (Number(createdOutput.amount) + Number(form.products.quantities[index]))
                            }, {
                                where: {
                                    [Op.and]: [{product_id: form.products.sizes[index]}, {collaborator_id: 0}]
                                }
                            });
                        } catch (err) {
                            return res.json({
                                message: {
                                    type: "error",
                                    message: err.message,
                                }
                            })
                        }
                        
                    } else {
                        try {
                            const createOutput = await Output.create({
                                collaborator_id: form.finality == 1 ? collaborator : 0,
                                responsible_id: collaborator, 
                                user_id: form.user_id, 
                                product_id: form.products.sizes[index], 
                                amount: form.products.quantities[index], 
                                status: 1, 
                                obs: "",
                            })
    
                        await createOutput.save()
                        } catch (err) {
                            return res.json({
                                message: {
                                    type: "error",
                                    message: err.message,
                                }
                            })
                        }
                    }
                    
                });

            return res.json({
                message: {
                    type: "success",
                    message: "Retirada efetuada com sucesso!"
                }
            });

        }catch (err) {
            return res.json({
                message: {
                    type: "error",
                    message: "Algo deu errado, prencha todos os campos adequadamente e tente novamente!"
                }
            })
        }
        

       
    }
}