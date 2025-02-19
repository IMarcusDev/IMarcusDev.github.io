# Usa una imagen base de Node.js
FROM node:18-alpine

# Crea y usa el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala las dependencias sin las de desarrollo
RUN npm install --production

# Construye la aplicación con Vite
RUN npm run build

# Instala 'serve' para servir los archivos estáticos
RUN npm install -g serve

# Expone el puerto que usará la aplicación
EXPOSE 8080

# Comando para iniciar el servidor estático
CMD serve -s dist -l $PORT
