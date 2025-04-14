FROM node:18-slim

# Establecer variables de entorno para Node
ENV NODE_ENV=development
ENV PORT=3000

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && \
    # Instalar dependencias de desarrollo si estamos en modo development
    if [ "$NODE_ENV" = "development" ]; then npm install --only=development; fi

# Copiar el código fuente
COPY . .

# Asegurarnos de que nodemon está instalado correctamente
RUN if [ "$NODE_ENV" = "development" ]; then npm list nodemon || npm install nodemon; fi

# Exponer el puerto requerido
EXPOSE $PORT

# Exponer el puerto para debugging
EXPOSE 9229

# Configurar healthcheck para verificar que el servicio está funcionando
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/ || exit 1

# Ejecutar la aplicación
CMD ["npm", "run", "dev"]