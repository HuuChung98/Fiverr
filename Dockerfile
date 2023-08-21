FROM node:16
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --legacy-peer-deps
COPY prisma ./prisma/
RUN yarn prisma generate
COPY . .
EXPOSE 8080
CMD [ "node", "dist/main" ]