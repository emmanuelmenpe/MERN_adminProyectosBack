# MERN administración de proyectos y tareas

API REST hecha con ExpressJS para implementación del Backend para poder registrarse como usuario y crear proyectos que contendrán tareas y poder aplicarles el CRUD, ésta API es consumida por una APP Frontend que está alojada en esta misma cuenta de gitHub.

## Instalación depandencias

Tener instalado [nodeJS](https://nodejs.org/es/), acceder al proyecto desde la terminal y ejecutar **npm install**. <br/>
Tener instalado [MongoDB](https://docs.mongodb.com/manual/installation/), e iniciar el servidor de mongo.

### Configuración del entorno

Es recomendable usar el [**Frontend**](https://github.com/emmanuelmenpe/MERN_adminProyectosFront) creado para ésta API REST.<br/>
Crear una base de datos en mongo.<br/>
Crear en la carpeta principal del proyecto un archivo .env y crear los siguietes variables:
- PORT(almacena el puerto en el que estara corriendo el servidor).
- MONGOOSE_URI(dirección donde se encuentra la bade de datos).
- NOMBREDB(opcional, nombre de la base de datos).
- SECRETA(clave que se usa para los JSON Web Token.<br/>


### Ejecutar API

Para ejecutar la API es necesario acceder al proyecto desde la terminal y ejecutar **npm run dev**.
