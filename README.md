# Servidor con balance de carga
Desafío entregable para el curso de backend de Coderhouse

## Para probar el código:

```bash
# Clonar el repositorio
$ git clone https://github.com/cabrerarodrigo/servidor_con_balance_de_carga.git

# Instalar dependencias
$ npm install

# Instalar librerías para realizar las pruebas (en caso de no tenerlas)
$ npm istall pm2 -g
$ npm install forever -g
```
# Servidores en Node
### Pruebas a realizar:
```bash
#Prueba con nodemon (modo fork)
$ npm run dev

#Prueba con nodemon (modo cluster)
$ npm run dev-cluster

#Prueba con forever
$ forever start index.js -w --modo=fork --puerto=8080
$ forever list

#Detener prueba de forever
$ forever stop index.js

#Pruebas con pm2
$ pm2 start index.js --name="Servidor1" --watch -- --puerto=8080
$ pm2 start index.js --name="Servidor2" --watch -i max -- --puerto=8089

#Detener pruebas con pm2
$ pm2 stop Servidor1
$ pm2 stop Servidor2
```

# Servidor nginx
- Importante: instalar nginx y reemplazar el archivo de configuración por el que se encuentra en el repositorio

### Pruebas a realizar:
#### Primera parte de la consigna:
```bash
# Ejecutar nginx (en SO Windows)
$ sudo nginx # --> sólo en iOS

$ pm2 start index.js --name="ServidorCluster" --watch -- --puerto=8081 --modo=cluster
$ pm2 start index.js --name="ServidorSimple" --watch -- --puerto=8080

# Para finalizar:
$ pm2 stop ServidorCluster
$ pm2 stop ServidorSimple

# Finalizar el proceso de nginx (en SO Windows)
$ sudo nginx -s stop # --> sólo en iOS
```

#### Segunda parte de la consigna:
- Descomentar [la sección de nginx.conf](https://github.com/cabrerarodrigo/servidor_con_balance_de_carga/blob/main/nginx.conf#:~:text=%23server%20127.0.0.1%3A8082,server%20127.0.0.1%3A8085%3B) señalada como 'Segunda parte de la consigna'
- Comentar [la anterior](https://github.com/cabrerarodrigo/servidor_con_balance_de_carga/blob/main/nginx.conf#:~:text=server%20127.0.0.1%3A8081%3B)

```bash
# Ejecutar nginx (en SO Windows)
$ sudo nginx # --> sólo en iOS

$ pm2 start index.js --name="ServidorSimple" --watch -- --puerto=8080

# Para finalizar:
$ pm2 stop ServidorSimple

# Finalizar el proceso de nginx (en SO Windows)
$ sudo nginx -s stop # --> sólo en iOS
```
