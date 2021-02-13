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

//CREAR 
router.get('/crear',(req, res)=>{
    res.render("crear")
})

//CREAR
//nos permite recibir información de nuestro sitio web (formulario)
router.post('/', async(req, res)=>{
    const body = req.body
    /* console.log(body); */ // funciona sí tenemos body parser
    try{
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()

        //await Mascota.create(body)
        res.redirect("/mascotas")
        /* console.log(mascotaDB) */
    }catch(error){
        console.log(error)
    }
})



//EDITAR
//OBTENER INFORMACION
router.get("/:id", async(req, res)=>{

    const id=req.params.id //leer la url del id


    try {
        const mascotaDB= await Mascota.findOne({_id: id}) //el primer elemento que coincida con _id
      /*   console.log(mascotaDB); */
      res.render('detalle', {
          mascota: mascotaDB,
          error:false
      })


        
    } catch (error) {
        console.log(error)
        res.render('detalle', {
           
            error:true,
            mensaje:"no se encuentra el id seleccionado"
        })
    }
})


//ELIMINAR 
router.delete("/:id", async(req, res)=>{
    const id=req.params.id
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id})

        if(mascotaDB){
            res.json({
                estado:true,
                mensaje: 'Eliminado'
            })
        }else{
            res.json({
                estado:false,
                mensaje: 'fallo eliminar!'
            })
        }

    } catch (error) {
        console.log(error)
    }
})

//MODIFICAR ACTUALIZAR
router.put("/:id", async (req, res)=>{
const id=req.params.id
const body=req.body //nombre y descripción modificada
    try {
        const mascotaDB=await Mascota.findByIdAndUpdate( id, body, { useFindAndModify: false} )
/* console.log(mascotaDB) */

res.json({
    estado: true,
    mensaje: 'Editado'
})
        
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Fallamos'
        })
    }
})

module.exports=router;