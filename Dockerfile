FROM node:16-alpine

WORKDIR /app

COPY package.json .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --omit=dev; \
    fi;

COPY . .
RUN npx prisma generate
RUN npx prisma db push
EXPOSE 8080
CMD ["npm", "run", "dev"]

