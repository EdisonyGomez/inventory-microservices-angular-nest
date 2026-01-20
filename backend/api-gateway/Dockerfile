# 1. Imagen base de Node
FROM node:20-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml* ./

# 4. Instalar pnpm y dependencias
RUN npm install -g pnpm && pnpm install

# 5. Copiar el resto del código
COPY . .

# 6. Construir la aplicación
RUN pnpm run build

# 7. Exponer el puerto del microservicio
EXPOSE 3000

# 8. Comando para iniciar
CMD ["pnpm", "run", "start:prod"]