const express = require('express');
const path = require('path');
const router = require('./router.cjs');

const app = express();
app.use(express.json());

app.use('/',router)

app.use((req,res)=>{
    res.status(404).json({message:"No tiene autorizacion"})
})

let config = {

    port: process.env.VITE_PORT_BACKEND,
    host: process.env.VITE_HOST

}

app.listen(config,()=> {
    console.log(`servidor corriendo en http://${config.host}:${config.port}`)

});