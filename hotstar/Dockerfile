# Stage 1: Build React App
FROM node:18 AS builder

WORKDIR /app

# Accept TMDB key from Jenkins
ARG REACT_APP_TMDB
ENV REACT_APP_TMDB=$REACT_APP_TMDB

COPY package.json package-lock.json ./
RUN npm install

# COPY AFTER setting ENV so build picks variable
COPY . .

RUN echo "REACT_APP_TMDB is: $REACT_APP_TMDB"
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
