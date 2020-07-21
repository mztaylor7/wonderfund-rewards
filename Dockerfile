FROM node

WORKDIR /app

COPY . .

RUN npm run install
RUN npm run build

CMD []