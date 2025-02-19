# Usar una imagen base de Node.js para producción
FROM node:18-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json /app/

# Instalar todas las dependencias (de desarrollo y producción)
RUN npm install

# Copiar todo el código fuente de tu proyecto
COPY . /app/

# Crear el build de Vite
RUN npm run build

# Instalar el servidor estático 'serve' para servir los archivos
RUN npm install -g serve

# Comando para iniciar el servidor estático
CMD ["serve", "-s", "dist", "-l", "$PORT"]
