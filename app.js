const express= require('express');
const bodyParser = require ('body-parser');
let os = require('os');
const app=express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //Método POST
// parse application/json
app.use(bodyParser.json())



require('dotenv').config();

const port=process.env.PORT || 3000; //VARIABLE DE ENTORNO

console.log(os.networkInterfaces());

//Conexión a BD
const mongoose = require('mongoose');

/* const user='prueba_jun';
const password='hQJV5dDHIiIaUhoX';
const dbname='veterinaria';  */
//nombre de la bd en collections

const  uri=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.9zeom.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; //url de conexión

mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(()=>console.log('Base de datos conectada'))
    .catch(e=>console.log(e))

//motor de plantillas
app.set('view engine','ejs');

app.set('views', __dirname+'/views') //nos ubicamos en el archivo views


//solicitud que haga el cliente, que pedimos a través de la url, solicitudes en get, pedimos ciertos archivos
app.use(express.static(__dirname+"/public"))//Archivos estáticos middleware (forma más floja)

app.use('/', require('./router/RutasWeb'))
app.use('/mascotas', require('./router/Mascota'))

app.use((req,res,next)=>{
   /*  res.status(404).sendFile(__dirname+"/public/404.html") */ //sí es status 404, que muestre esta página
   res.status(404).render("404",{
       titulo:404,
       descripcion:'Error crítico 404 de hoy'
   }) //lo que va dentro del render es la ruta del archivo
})

app.listen(port,()=>{
    console.log('servidor a su servicio en el puerto', port)
})