# imagen node
FROM node:latest

# crear carpeta en el contenedor
RUN mkdir -p /usr/src/app

# seleccionar carpeta de trabajo
WORKDIR /usr/src/app

# copiar configuraciones
COPY package*.json ./

# ejecutar comando instalacion node_modules
RUN npm install

# copiar carpeta principal
COPY . .

# asignar puerto local & contenedor
EXPOSE 3000

# ejecutar todo
CMD [ "npm", "run", "dev" ]