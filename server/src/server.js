const express = require('express')
const app = express()
const port = 3333
const routes = require('./routes')
require('./database')


app.use(express.json())
app.use(routes)
app.listen(port, () => {
    console.log("NODE rodando na porta " + port)
})


