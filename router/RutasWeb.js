const express = require('express');
const router=express.Router();
let os = require('os')




router.get('/',(req, res)=>{
    /* res.send('Mi respuesta desde express'); */
    res.render("index",{titulo:"Mi título dinámico"})
    })
    
    router.get('/servicios',(req, res)=>{
        /* res.send('Estás en la página de servicios') */
        res.render("servicios", {tituloServicios:os.hostname()})
    })

    module.exports=router;