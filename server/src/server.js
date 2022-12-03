const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT; // || 3333


const routes = require('./routes')
require('./database')

// cors
const cors = require('cors')
const whitelist = ["http://localhost:3000", "http://127.0.0.1:5501"]
const corsOptions = {
    origin: ( origin, callback ) => {
        if( !origin || whitelist.indexOf(origin) !== -1 ) {
            callback(null, true)
        } else { 
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}


app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)
app.listen(port, () => {
    console.log("NODE rodando na porta " + port)
})


