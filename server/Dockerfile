# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose your backend port
EXPOSE 8080

# Start the backend
CMD ["npm", "run", "server"]
