# Usar una imagen base de Node.js optimizada para producción
FROM node:18-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero para aprovechar la caché de Docker
COPY package.json package-lock.json /app/

# Instalar solo las dependencias de producción
RUN npm install --production

# Copiar todo el código fuente
COPY . /app/

# Crear el build de Vite
RUN npm run build

# Instalar el servidor estático 'serve'
RUN npm install -g serve

# Exponer el puerto para Railway
EXPOSE 3000

# Iniciar el servidor con 'serve' asegurando que acepte conexiones externas
CMD serve -s dist --no-single -l 0.0.0.0:$PORT
