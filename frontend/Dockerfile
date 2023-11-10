# Étape de build
FROM node:18 AS build

WORKDIR /usr/src/app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation de Node.js et npm
RUN apt-get update && \
    apt-get install -y nodejs && \
    npm install npm@latest -g

# Installation des dépendances
RUN npm install

# Copie de tous les fichiers du projet
COPY . .

# Build de l'application Angular
RUN npm run build

# Étape de production
FROM nginx:1.21.3-alpine

# Copie des fichiers de construction de l'étape de build
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Démarre le serveur nginx
CMD ["nginx", "-g", "daemon off;"]
