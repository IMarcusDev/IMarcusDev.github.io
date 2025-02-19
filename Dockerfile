# Usar una imagen base de Node.js para producción
FROM node:18-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json /app/

# Instalar dependencias necesarias
RUN npm install --production

# Copiar todo el código fuente de tu proyecto
COPY . /app/

# Crear el build de Vite
RUN npm run build

# Instalar el servidor estático 'serve' para servir los archivos
RUN npm install -g serve

# Exponer el puerto 5000 (o el que desees)
EXPOSE 5000

# Comando para iniciar el servidor estático
CMD ["serve", "-s", "dist", "-l", "5000"]
