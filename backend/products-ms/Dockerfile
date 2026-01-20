FROM node:20-alpine

WORKDIR /app

# 1. Instalamos pnpm v10 y nest globalmente
RUN npm install -g pnpm@latest @nestjs/cli

# 2. Copiamos archivos de dependencias
COPY package.json pnpm-lock.yaml* ./

# 3. CONFIGURACIÓN CLAVE PARA PNPM V10 Y PRISMA
# 'hoisted' para visibilidad y 'only-allow-trusted-dependencies' para que Prisma pueda ejecutarse
RUN pnpm config set node-linker hoisted
RUN pnpm install --no-frozen-lockfile

# 4. Copiamos el resto del código (Asegúrate de tener el .dockerignore)
COPY . .

# 5. Generar el cliente de Prisma
# Forzamos la generación. Si falla aquí, revisa que la ruta ./prisma/schema.prisma sea correcta
RUN npx prisma generate --schema=./prisma/schema.prisma

# 6. Construir la aplicación
RUN nest build

EXPOSE 8877

CMD ["node", "dist/src/main"]