
# 📈 Portfolio Tracker

- Portfolio Tracker is a web application that helps users manage their investment portfolios. 
- It provides features to add, update, and delete stocks, along with a graphical dashboard for visualizing stock distribution and profit/loss. 
- The project consists of a React frontend and a Spring Boot backend.

## 🌟 Key Features

### Frontend

- User Authentication: Login and signup with form validation.
- Stock Management:
    - Add, update, delete stocks.
    - View all stocks in a detailed table.
- Dashboard: 
    - Visualize stock distribution using a Pie Chart.
    - Analyze profit and loss using a Bar Chart.
- Responsive Design: Built with Tailwind CSS for seamless usage across devices.
- Real-Time Feedback: Toast notifications and loading indicators.

### Backend
- RESTful APIs: Endpoints for user authentication, stock management, and portfolio metrics.
- JWT Authentication: Secured endpoints using JSON Web Tokens.
- Database Management: CRUD operations on stock data with user-specific storage.

## 🛠️ Technology Stack

- Frontend: React.js
- Backend: SpringBoot
- Database: Postgresql
- Maven: For backend dependency management
## Run Locally

Clone the project

```bash
  git clone https://github.com/Vedarth1/PortfolioTracker
```

Go to the project directory

```bash
  cd PortfolioTracker
```
### 🖥️ Frontend Setup

Go to Frontend directory
```bash
  cd app
```
Create .env file and set backend uri

```bash
  REACT_APP_API_BASE_URL=http://localhost:8080/api
```

Install dependencies

```bash
  npm install
```
Run Frontend

```bash
  npm run dev
```
- Access the Application: The frontend will be available at http://localhost:5173.

### 🛠️ Backend Setup

#### In root directory

Configure the Database: Update src/main/resources/application.properties with your Postgresql credentials:

```bash
  spring.application.name=PortfolioTracker
  spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio
  spring.datasource.username=myuser
  spring.datasource.password=mypassword
  spring.datasource.driver-class-name=org.postgresql.Driver
  springdoc.api-docs.path=/v1/api-docs
  springdoc.swagger-ui.path=/swagger-ui.html
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

Build and Run the Backend:

```bash
  mvn clean install
  mvn spring-boot:run
```

## Using Docker

```bash
  docker-compose up --build
```

# Swagger Access

http://localhost:8080/swagger-ui/index.html
## 🌐 API Endpoints

- Authentication
    - POST /api/auth/signup: Register a new user.
    - POST /api/auth/login: Authenticate a user and return a JWT token.
- Stock Management
    - POST /api/stocks/add: Add a new stock.
    - GET /api/stocks/portfolio: Retrieve all stocks in the user's portfolio.
    - PUT /api/stocks/update/{id}: Update an existing stock.
    - DELETE /api/stocks/delete/{id}: Delete a stock.
- Portfolio Dashboard
    - GET /api/portfolio/value: Get the total value of the portfolio.
    - GET /api/portfolio/dashboard: Retrieve stock distribution and profit/loss data.

# Project Live

- Project:- http://65.2.81.186:5172/
- Api Swagger:- http://65.2.81.186:8080/swagger-ui/index.html
