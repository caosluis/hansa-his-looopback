FROM node:latest
RUN mkdir -p /opt/docknode2
WORKDIR /opt/docknode2
COPY package.json /opt/docknode2
RUN npm install
COPY . /opt/docknode2
RUN npm install -g nodemon
EXPOSE 3000
EXPOSE 4444
CMD ["npm", "start"]
