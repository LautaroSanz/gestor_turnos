# Etapa de construcción
FROM node:18-alpine as build

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias - cambiado npm ci a npm install
RUN npm install

# Copiar el código fuente
COPY . .

# Definir variable de entorno para la URL del API
# Esto se puede sobrescribir durante la ejecución del contenedor
ARG REACT_APP_API_URL=http://localhost:3000/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos compilados desde la etapa de construcción
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]