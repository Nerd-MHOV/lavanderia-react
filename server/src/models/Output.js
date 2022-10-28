const { Model, DataTypes } = require('sequelize');
const Inventory = require('./Inventory');
const Output_log = require('./Output_log');

class Output extends Model {
    static init(sequelize) {
        super.init({
            amount: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
            obs: DataTypes.STRING,
        }, {
            sequelize,
            hooks: {
                afterCreate: async (instance) => {
                     console.log('afterCereate');
                    // func ((new.id_product, new.amount * -1)
                    let prod_id = instance.dataValues.product_id;
                    let input_amount = instance.dataValues.amount * -1;
                    await inventoryEngine(prod_id, input_amount)


                    let {collaborator_id, responsible_id, user_id, product_id, amount, status, obs} = instance.dataValues;
                    //gerar log
                    const logGenerete = await Output_log.create({collaborator_id, responsible_id, user_id, product_id, amount, status, obs});
                    await logGenerete.save();

                },
                
                afterUpdate: async (instance, options) => {
                    console.log('afterUpdadte');
                    //func (new.id_product, old.amount - new.amount);
                    let prod_id = instance.dataValues.product_id;
                    let input_amount = (instance._previousDataValues.amount - instance.dataValues.amount);
                    inventoryEngine(prod_id, input_amount);
                },
                
                afterDestroy: async (instance, options) => {
                    console.log('beforeDestroy');
                    //func (old.id_product, old.amount)
                    let prod_id = instance.dataValues.product_id;
                    let input_amount = instance.dataValues.amount;
                    inventoryEngine(prod_id, input_amount);

                    
                },
                
            },
        })
    }

    static associate(models) {
        this.belongsTo(models.Product, {foreignKey: 'product_id', as: 'product'})
        this.belongsTo(models.Collaborator, {foreignKey: 'collaborator_id', as: 'collaborator'})
        this.belongsTo(models.Collaborator, {foreignKey: 'responsible_id', as: 'responsible'})
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
    }

}

const inventoryEngine = async (prod_id, input_amount) => {
    const product_inventory = await Inventory.findOne({ where: { product_id: prod_id }});
    if ( product_inventory === null) {
        // não encontrado CREATE
        const product = await Inventory.create({ product_id: prod_id, amount: input_amount})
        console.log('Item criado :', product)
    } else {
        // encontrado! UPDATE
        let newAmount = product_inventory.amount + input_amount;
        const product = await Inventory.update({ amount: newAmount}, {
            where: {id: product_inventory.id}
        })
        console.log("item atualizado para:", product);
    }
};


module.exports = Output