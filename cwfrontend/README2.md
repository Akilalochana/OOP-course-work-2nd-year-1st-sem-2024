# Full Stack Application

## Overview
This is a full-stack application consisting of a React frontend and Spring Boot backend. The frontend provides a modern, responsive user interface, while the backend offers robust RESTful APIs and database integration.

## Project Structure
```
OOP CW/
├── cwfrontend/           # React Frontend Application
│   ├── public/           # Static files
│   ├── src/              # Source files
│   └── package.json      # Frontend dependencies
│
└── oopspringbootcccc/    # Spring Boot Backend Application
    ├── src/
    │   ├── main/         # Main source files
    │   └── test/         # Test files
    └── pom.xml           # Backend dependencies
```

## Frontend (React.js)

### Technologies Used
- React.js 18.3.1
- React Router DOM 7.0.2
- Bootstrap 5.3.3
- Axios for API communication
- React Bootstrap for UI components
- Lucide React for icons

### Features
- Responsive design using Bootstrap
- Modern UI components with React Bootstrap
- Client-side routing with React Router
- API integration using Axios
- Icon support with Lucide React

### Installation and Setup
1. Navigate to frontend directory:
```bash
cd cwfrontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```
Frontend will be available at `http://localhost:3000`

## Backend (Spring Boot)

### Technologies Used
- Java 11
- Spring Boot 2.7.14
- Spring Web MVC
- Spring Data JPA
- Maven for dependency management
- Spring Security (if applicable)

### Features
- RESTful API endpoints
- Database integration
- Error handling
- API documentation
- Security implementation

### Installation and Setup
1. Navigate to backend directory:
```bash
cd oopspringbootcccc
```

2. Configure database in `src/main/resources/application.properties`

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```
Backend will be available at `http://localhost:8080`

## API Endpoints
- `GET /api/resource` - Get all resources
- `POST /api/resource` - Create a new resource
- `PUT /api/resource/{id}` - Update a resource
- `DELETE /api/resource/{id}` - Delete a resource

## Prerequisites
### For Frontend Development
- Node.js (Latest LTS version)
- npm (comes with Node.js)

### For Backend Development
- Java 11 JDK
- Maven 3.6+
- IDE (IntelliJ IDEA recommended)
- MySQL/PostgreSQL (depending on configuration)

## Running the Full Stack Application
1. Start the backend server first:
```bash
cd oopspringbootcccc
mvn spring-boot:run
```

2. In a new terminal, start the frontend:
```bash
cd cwfrontend
npm start
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Last Updated
2024-12-16
