
## Client-vox
This is the frontend for with the following requirements.
##### 1. Autenticación de Usuarios

##### PROBLEMA:

Se debe contar con una tabla en la base de datos con los usuarios y contraseñas para autenticación del uso de la GUI.

##### REQUERIMIENTO:

Crear una tabla con los usuarios y sus respectivas contraseñas y hacer una página de inicio de sesión para proteger todas las páginas subsiguientes en la GUI.

##### 2. Despliegue de GUI

##### REQUERIMIENTO:

Crear una GUI en donde el usuario que inició sesión exitosa pueda realizar las siguientes tareas:

-   Cargar un archivo .csv para alimentar la lista de propiedades
-   Ver una lista completa de propiedades y filtrarlas basado en los siguientes campos:
    -   Cantidad de habitaciones
    -   Rango de precio (mínimo y máximo)
    -   Ubicación basada en rangos de kilómetros de un punto de referencia (zona perimetral)
    -   Metraje de la propiedad
    -   Posee balcón
    -   Pet friendly
    -   Piscina
    -   Jardin
-   Descargar un CSV o PDF con los resultados aplicados en el filtro
  

## Getting Started

To run the development server do the following:

yarn dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```
Important: This repo uses the api of [https://github.com/sorozcov/server-vox](https://github.com/sorozcov/server-vox) 
You need to run this repo too.
```

  

## TODO

 - Still missing filters for report and general accommodations list.
 - Needs to improve the way of saving the JWT Token of the user.
 - Toasts are missing. Right now alerts are being shown. This also has to do with the API not sending the full message error.

