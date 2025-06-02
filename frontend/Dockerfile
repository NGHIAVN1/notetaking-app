# Build Stage
FROM --platform=linux/amd64 node:alpine3.11 AS build

RUN mkdir -p /app

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json /


RUN npm install

COPY . . /app/

# Copy the rest of the app

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
RUN npm run build

# Production Stage
FROM  --platform=linux/amd64 nginx:1.28.0-alpine AS production

# Copy frontend build files (e.g., React's build/)
COPY --from=build /app/dist /usr/share/nginx/html/


COPY --from=build /app/dist /usr/share/nginx/html/

# Expose port 80 for the web server
EXPOSE 80

