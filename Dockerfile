FROM node:20-alpine

# Defina o diretório de trabalho já como server
WORKDIR /usr/src/app/server

# Ativar o pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar apenas arquivos de dependências primeiro (melhor cache)
COPY server/package.json server/pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar o resto dos arquivos
COPY server .

# Gerar Prisma Client
RUN pnpm prisma generate

# Build do NestJS
RUN pnpm build

EXPOSE 3333

CMD ["node", "dist/main.js"]
