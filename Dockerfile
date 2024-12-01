FROM node:alpine
RUN mkdir /nodeapp
WORKDIR /nodeapp
COPY . .
RUN npm update
RUN npm install
EXPOSE 5000
CMD ["node","app.js"]
