# Étape de build du frontend
FROM node:18 AS build

# Création du répertoire de travail
WORKDIR /app

# Copie de tous les fichiers du projet
COPY . .

# Installation des dépendances
RUN npm install


# Build de l'application Angular
RUN npm run build

# Étape de production
FROM nginx:1.21.3-alpine

COPY nginx.prod.conf /etc/nginx/nginx.conf
# Copie des fichiers de construction de l'étape de build
COPY --from=build /app/dist/* /usr/share/nginx/html