const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const mascotaSchema=new Schema({

    nombre: String, //Nombre de tipo String
    descripcion: String,
})


//crear modelo
const Mascota= mongoose.model('Mascota', mascotaSchema);

module.exports= Mascota; // exportamos el modelo;