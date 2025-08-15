# Pantohealth Backend

## Overview
This is a NestJS application for managing IoT x-ray data using RabbitMQ integration, as part of the PANTOhealth Backend Developer Technical Assessment.

## Setup
1. **Prerequisites:**
   - Node.js (v18+ recommended)
   - MongoDB (running locally on `mongodb://localhost:27017/pantohealth`)
   - RabbitMQ (running locally on `amqp://localhost:5672`)

2. **Installation:**
   - Clone the repository: `git clone <your-repo-url>`
   - Navigate to the project directory: `cd backend`
   - Install dependencies: `npm install`

3. **Running the Application:**
   - Start MongoDB and RabbitMQ services locally.
   - Run the application: `npm run start:dev`
   - The app will be available at `http://localhost:3000`

## Using Swagger
- Swagger UI is integrated for API documentation.
- Access it at: `http://localhost:3000/api`
- Explore endpoints, test requests, and view response schemas interactively.

## Assumptions
- Local MongoDB and RabbitMQ instances are used.
- Sample x-ray data from the provided Google Drive link is utilized.
- Error handling is implemented where applicable (optional per assessment).

## Running the Producer
- Clone the producer app separately: `git clone <producer-repo-url>`
- Navigate to the producer directory: `cd producer-app`
- Install dependencies: `npm install`
- Run the producer: `npm run start` (sends sample x-ray data to RabbitMQ)

## Notes
- Ensure all services (MongoDB, RabbitMQ) are running before starting the application.
- For production, consider Dockerizing the project (optional, bonus points).

## Submission Guidelines
- Provide a GitHub repository with your solution.
- Include this README with setup and running instructions (bonus points).
- Optionally, Dockerize each project (bonus points).