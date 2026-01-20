FROM node:20-alpine AS build
WORKDIR /app
# Al estar este archivo dentro de /frontend, copiará el package.json de esa carpeta
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

FROM nginx:stable-alpine
# Verifica que el nombre de la carpeta en /dist sea 'inventory-web'
COPY --from=build /app/dist/inventory-web/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]