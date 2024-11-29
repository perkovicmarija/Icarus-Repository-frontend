FROM node:20.9.0

WORKDIR /app

COPY . .

RUN yarn install

# host 0.0.0.0 means it listens on all interfaces so can be reachable from host
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
