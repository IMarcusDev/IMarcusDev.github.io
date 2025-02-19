# Usar una imagen base de Node.js optimizada
FROM node:18-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json /app/

# Instalar todas las dependencias (incluyendo dev para el build)
RUN npm install

# Copiar el código fuente
COPY . /app/

# Crear el build de Vite
RUN npm run build

# Instalar el servidor estático 'serve'
RUN npm install -g serve

# Exponer el puerto para Railway
EXPOSE 3000

# Iniciar el servidor de archivos estáticos en producción
CMD ["npm", "run", "start"]
