const express= require('express');
let os = require('os')
const app=express();
const port=process.env.PORT || 3000;

//motor de plantillas
app.set('view engine','ejs');

app.set('views', __dirname+'/views') //nos ubicamos en el archivo views


//solicitud que haga el cliente, que pedimos a través de la url, solicitudes en get, pedimos ciertos archivos
app.use(express.static(__dirname+"/public"))//Archivos estáticos middleware (forma más floja)



app.get('/',(req, res)=>{
/* res.send('Mi respuesta desde express'); */
res.render("index",{titulo:"Mi título dinámico"})
})

app.get('/servicios',(req, res)=>{
    /* res.send('Estás en la página de servicios') */
    res.render("servicios", {tituloServicios:os.hostname()})
})

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