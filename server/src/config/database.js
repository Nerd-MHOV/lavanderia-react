require('dotenv').config()
module.exports = {
    dialect: process.env.DB_DIALECT, //postgress
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_DBNAME,
    define: {
        timestamps: true, //created_at, updated_at
        underscored: true,
    },
}