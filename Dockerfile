# Use uma imagem base oficial do Node.js LTS
FROM node:14

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependência para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o restante do código para o diretório de trabalho
COPY . .

# Exponha a porta configurada na variável de ambiente
ENV PORT=3000
EXPOSE $PORT

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
