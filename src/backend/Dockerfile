# Usa la imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json del backend
COPY src/backend/package*.json ./

# Instalar las dependencias dentro del contenedor
RUN npm install

# Copiar el resto del código del backend
COPY src/backend ./

# Exponer el puerto 5000
EXPOSE 5000

# Ejecutar el servidor backend
CMD ["npm", "start"]
