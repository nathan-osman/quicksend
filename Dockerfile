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
COPY --from=ui /usr/src/app/dist/ ui

# Build the application
RUN go build


FROM debian:latest

# Copy the application
COPY --from=backend /usr/src/app/quicksend /usr/local/bin

ENTRYPOINT ["/usr/local/bin/quicksend"]
