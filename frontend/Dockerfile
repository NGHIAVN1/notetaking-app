# Build Stage
FROM node:18-alpine AS build

RUN mkdir -p /app

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

RUN npm install


# Copy the rest of the app
COPY . .

# Pass environment variables at build time
ARG PORT=3000
ARG PROXY_API
ARG PROXY_LOGIN

# Set environment variables explicitly
ENV REACT_HOST=0.0.0.0
ENV REACT_PORT=${PORT}
ENV PROXY_API=${PROXY_API}
ENV PROXY_LOGIN=${PROXY_LOGIN}

# Ensure a clean production build
RUN npm run build && ls -l /app/dist

# Production Stage
FROM nginx:stable-alpine AS production

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
