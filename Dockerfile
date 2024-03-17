FROM node:latest AS ui

WORKDIR /usr/src/app

# Copy the package files
COPY ui/package.json ui/package-lock.json ./

# Install package requirements
RUN npm install

# Copy the remaining files
COPY ui/ .

# Build the application bundle
RUN npm run build


FROM golang:latest AS backend

WORKDIR /usr/src/app

# Copy the package files
COPY go.mod go.sum ./

# Install package requirements
RUN go mod download && go mod verify

# Copy the remaining Go files
COPY . .

# Copy the UI files
COPY --from=ui /usr/src/app/dist/ ui/dist

# Build the application
RUN go build


FROM debian:latest

# Install wget
RUN apt-get update && \
    apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/*

# Copy the application
COPY --from=backend /usr/src/app/quicksend /usr/local/bin

ENTRYPOINT ["/usr/local/bin/quicksend"]

# Application is up and running when it responds to HTTP requests
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
