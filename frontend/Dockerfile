# Étape de build du frontend
FROM node:18 AS build

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie de tous les fichiers du projet
COPY . .

# Build de l'application Angular
RUN npm run build

# Étape de production
FROM nginx:1.21.3-alpine

# Copie des fichiers de construction de l'étape de build
COPY --from=build /app/dist /usr/share/nginx/html
