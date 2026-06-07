# Combination Generator

Full-stack application for generating permutations of the numbers 1..N, where: 1 ≤ N ≤ 20

The solution was developed as a technical assignment using Angular 20 and FastAPI, with an emphasis on scalability, maintainability, and efficient computation.

## Technologies

### Client
- Angular 20
- TypeScript
- Bootstrap 5.3
- Font Awesome

### Server
- Python
- FastAPI
- Pydantic

## Key Design Decisions

- All calculations are performed on the server.
- Stateless server architecture.
- No pre-generation or storage of permutations.
- Direct permutation access using the Factorial Number System (Lehmer Code).
- Server-side pagination.
- Feature-based Angular architecture.
- Centralized state management using Angular Signals.
- Clear separation of concerns between UI, state, API, and business logic.

## Project Structure

combination-generator/
│
├── client/
└── server/

## API Endpoints

### POST /start
Returns the total number of permutations for a given N.

### POST /next
Returns the requested permutation and its index.

### GET /all
Returns paginated permutations for display.

## Features

- Calculate total permutations (N!)
- Display the next permutation
- Display all permutations with server-side pagination
- First page navigation
- Previous page navigation
- Next page navigation
- Last page navigation
- Jump to a specific page
- Reset calculation

## Running the Project

### Server

pip install -r requirements.txt
uvicorn main:app --reload

Swagger UI:
http://localhost:8000/docs


### Client

npm install
ng serve

Application:
http://localhost:4200