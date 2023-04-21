# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files to the container
COPY . .

# Build
RUN npm run build

# Expose vite port 5173
EXPOSE 5173

# Start the application
CMD [ "npm", "run", "dev" ]