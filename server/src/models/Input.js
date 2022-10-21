const { Model, DataTypes } = require('sequelize');
const Inventory = require('./Inventory');

class Input extends Model {
    static init(sequelize) {
        super.init({
            amount: DataTypes.INTEGER,
        }, {
            sequelize,
            hooks: {
                afterDestroy: async () => {
                    //func (old.id_product, old.amount * -1, old.id_department)
                    console.log('afterDestroy');
                    
                },
                afterCreate: async (instance, options) => {
                    console.log(instance, options);
                    //func (new.id_product, new.amount, new.id_department);
                    console.log('afterCereate');
                    let prod_id = instance.id;
                    let input_amount = instance.amount;
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

                },
                afterUpdate: () => {
                    console.log('afterUpdadte');
                    //func (new.id_product, new.amount - old.amount, new.id_department);
                },
            }
        })
    }

    //(IN id_prod int, IN input_amount int, IN id_depart int)

    //verificar se o produto existe em estoque
    // IF counter > 0 THEN
    //     UPDATE inventory SET amount=amount + input_amount
    //     WHERE id_product = id_prod;
    // ELSE
    //     INSERT INTO inventory (id_product, amount, id_department) values (id_prod, input_amount, id_depart);
    // END IF;

    static associate(models) {
        this.belongsTo(models.Product, {foreignKey: 'product_id', as: 'product'})
    }

}

module.exports = Input