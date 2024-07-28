FROM buildpack-deps:bullseye

ENV NODE_VERSION 22.2.0

EXPOSE 3000

COPY . ./
RUN npm install
RUN npm run build

CMD [ "node", "/dist/main.js"]
