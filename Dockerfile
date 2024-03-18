# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --force

RUN npm rebuild bcrypt

# Bundle app source
COPY . .

# Expose the port that your app will run on
EXPOSE 10048

# Define the command to run your application
CMD ["node", "app.js"]