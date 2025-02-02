# Proyecto Mod Proc - 2225
### Instalación

#### Pasos

1. Ejecute el siguiente comando en su terminal:
```bash
npm install
```

Esto instalará todas las dependencias utilizadas:
- Axios
- Concurrently
- Cors
- DaisyUI
- Express
- MySQL
- NoDemon
- pinia
- Tailwind
- Vue
- Vite

2. Para poder iniciar el proyecto, ejecute el siguiente comando:

```bash
npm run dev
```

Si desea personalizar los comandos, puede hacerlo al acceder al archivo [package.json](./package.json), la sección de ```scripts```.

3. to do

    1. Frontend 
    - Create landing page
    - Create login page 
    - Create appointments page 
    - Create history page 
    - Create validation page for medic

    2. Backend 
    - login functionality 
    - appointment scheduling functionality 
    - Appointment History Viewing Functionality 
    - Password Recovery Functionality 
    - Functionality to show available schedules 
    - Cancel appointment functionality 24 hours in advance 
    - Appointment attendance logging functionality 
        - Doctor may complete the appointment

#### Database

Para utilizar y generar la base de datos, deberá tener instalado Docker en su dispositivo.

Una vez instalado, se ejecutará el comando:

```bash
docker-compose up -d
```

Esto generará los contenedores.

Para verificar que los contenedores están ejecutándose correctamente, ejecute el comando:

```bash
docker ps
```

Si al ejecutar el comando se ve de esta manera, significa que los contenedores han sido instanciados y ejecutados correctamente:

```bash
$ docker ps
CONTAINER ID   IMAGE                       COMMAND                  CREATED        STATUS          PORTS                               NAMES
xxxxxxxxxxxx   consultoriodental-backend   "docker-entrypoint.s…"   now            Up 5 seconds    0.0.0.0:5000->5000/tcp              backend_container
xxxxxxxxxxxx   phpmyadmin/phpmyadmin       "/docker-entrypoint.…"   now            Up 12 seconds   0.0.0.0:8081->80/tcp                phpmyadmin_container
```

#### Database Tables

Para crear las tablas iniciales y sus valores, ejecute [phpmyadmin](localhost:8081) en su dispositivo.

Ya que el usuario por defecto no tiene los suficientes permisos/privilegios en la base de datos, deberá ejecutar en la terminal:

```bash
docker exec -it mysql_container mysql -u root -p
```


```bash
Enter password: root_password
```

Las credenciales se encuentran en el [docker-compose.yml](./docker-compose.yml) generado anteriormente:

```yml
mysql:
  ...
  environment:
    MYSQL_ROOT_PASSWORD: root_password
  ...
```

Ahora que hemos accedido a la base de datos mysql, podemos ejecutar los comandos en el [init.sql](./src/backend/db/init.sql):

```sql
-- SuperUsuario admin
CREATE USER 'admin'@'%' IDENTIFIED BY 'admin';  -- user 'admin', password 'admin'

GRANT ALL PRIVILEGES ON consultorio_db.* TO 'admin'@'%';
FLUSH PRIVILEGES;
```

Ahora, podemos acceder a la página web de [phpmyadmin](localhost:8081) y acceder con el usuario que hemos creado (admin).

Una vez dentro, ejecutaremos los comandos de creación de tablas utilizadas en la base de datos de [init.sql](./src/backend/db/init.sql) y podremos trabajar libremente con ellas.

#### API Calls

Para solicitar llamadas a la API, siempre iniciaremos el `localhost:PORT/api/loquesea`, las cuales son creadas en el archivo de [servidor](./src/backend/server.js).

#### Start Backend

##### Prerequisitos
- Docker debe estar ejecutándose.

  ```bash
  docker ps
  ```

##### Pasos
Acceda a la carpeta de [backend](./src/backend/server.js) y ejecute el comando: 

```bash
npm start
```

Esto iniciará los servicios y podrá hacer llamadas desde `localhost:5000/api`. Para verificar si el servidor MySQL está corriendo, revise el [estado](localhost:5000/api/status) del servidor.

Si desea cerrar el servidor, ejecute la combinación de teclas `Ctrl + C`.