# Use a multi-stage build to handle both backend and frontend
# Stage 1: Build frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build backend and integrate frontend
FROM node:18-alpine
WORKDIR /app

# Copy root package.json and install root dependencies
COPY package*.json ./
RUN npm install

# Copy backend package.json and install backend dependencies
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install

# Copy backend and frontend code to their respective directories
COPY backend/ /app/backend/
COPY --from=frontend-build /app/frontend/build /app/frontend/build

# Expose ports for backend (5000) and frontend (3000)
EXPOSE 5000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Run the backend (which will serve frontend build assets as well)
WORKDIR /app/backend
CMD ["npm", "run", "dev"]
