const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Department = require('../models/Department')
const Collaborator = require('../models/Collaborator')
const DepartmentHead = require('../models/DepartmentHead')
const ProductType = require('../models/ProductType')
const ProductService = require('../models/ProductService')
const Product = require('../models/Product')
const Inventory = require('../models/Inventory')
const Input = require('../models/Input')
const Output = require('../models/Output')
const Output_log = require('../models/Output_log')
const Return = require('../models/Return')

const connection = new Sequelize(dbConfig)


User.init(connection)
Department.init(connection)
DepartmentHead.init(connection)
Collaborator.init(connection)
ProductType.init(connection)
ProductService.init(connection)
Product.init(connection)
Inventory.init(connection)
Input.init(connection)
Output.init(connection)
Output_log.init(connection)
Return.init(connection)


Department.associate(connection.models)
DepartmentHead.associate(connection.models)
Collaborator.associate(connection.models)
ProductType.associate(connection.models)
ProductService.associate(connection.models)
Product.associate(connection.models)
Inventory.associate(connection.models)
Input.associate(connection.models)
Output.associate(connection.models)
Output_log.associate(connection.models)
Return.associate(connection.models)


module.exports = connection