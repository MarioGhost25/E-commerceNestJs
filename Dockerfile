# # Install dependencies only when needed
# FROM node:20-alpine AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json ./
# RUN npm install --frozen-lockfile

# # Build the app with cache dependencies
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build
# RUN ls -la /app/dist




# # Production image, copy all the files and run next
# FROM node:20-alpine AS runner

# # Set working directory
# WORKDIR /usr/src/app

# COPY package.json ./

# RUN npm install --prod

# COPY --from=builder /app/dist ./dist

# # # Copiar el directorio y su contenido
# # RUN mkdir -p ./pokedex

# # COPY --from=builder ./app/dist/ ./app
# # COPY ./.env ./app/.env

# # # Dar permiso para ejecutar la applicación
# # RUN adduser --disabled-password pokeuser
# # RUN chown -R pokeuser:pokeuser ./pokedex
# # USER pokeuser

# # EXPOSE 3000

# CMD [ "node","dist/main" ]

# 1. deps: instalar con npm ci
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. builder: build de tu código
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. runner: sólo prod
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# define entorno
ENV NODE_ENV=production
# crea user no‑root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# copia solo lo necesario
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
# expone puerto de NestJS
EXPOSE 3000
# opcional: healthcheck
HEALTHCHECK --interval=30s --timeout=5s CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

USER appuser
CMD ["node", "dist/main"]
