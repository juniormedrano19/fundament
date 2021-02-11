const express = require('express');
const router=express.Router();

const Mascota = require ('../models/mascota')

router.get('/', async (req, res)=>{

try{
//funcion find
const arrayMascotasDB= await Mascota.find() // va a encontrar la colección de Mascotas y va a traer sus documentos
console.log(arrayMascotasDB)
res.render("mascotas",{
    arrayMascotas: arrayMascotasDB
    /* arrayMascotas:[
        {id:1, nombre:'Nieve', descripcion:'perro'},
        {id:2, nombre:'Boby', descripcion:'gato'},
    ] */
})

}
catch(error){
console.log(error)
}







    
})

module.exports=router;