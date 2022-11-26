const { Model, DataTypes } = require('sequelize');
const Inventory = require('./Inventory');

class Input extends Model {
    static init(sequelize) {
        super.init({
            amount: DataTypes.INTEGER,
        }, {
            sequelize,
            hooks: {
                afterCreate: async (instance) => {
                     console.log('afterCereate');
                    // func (new.id_product, new.amount);
                    let prod_id = instance.dataValues.product_id;
                    let input_amount = instance.dataValues.amount;
                    inventoryEngine(prod_id, input_amount)

                },
                
                afterUpdate: async (instance, options) => {
                    console.log('afterUpdadte');
                    //func (new.id_product, new.amount - old.amount, );
                    let prod_id = instance.dataValues.product_id;
                    let input_amount = (instance.dataValues.amount - instance._previousDataValues.amount);
                    inventoryEngine(prod_id, input_amount);
                },
                
                afterDestroy: async (instance, options) => {
                    console.log('beforeDestroy');
                    //func (old.id_product, old.amount * -1)
                    let prod_id = instance.dataValues.product_id;
                    let input_amount = instance.dataValues.amount * -1;
                    inventoryEngine(prod_id, input_amount);
                },
                
            }
        })
    }

    static associate(models) {
        this.belongsTo(models.Product, {foreignKey: 'product_id', as: 'product'})
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

module.exports = Input