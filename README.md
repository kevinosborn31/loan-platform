# Loan platform

## Objective

Develop a tool that allows users to enter their personal and loan-related details through a form. After form submission, the server will process this information and return loan offers from multiple lenders based on the submitted details. This project aims to test the candidate's ability to integrate front-end and back-end technologies with a focus on code structure, types, tests, and clean functional code. A polished UI is not required, but practical application and user interaction are crucial.

## Local environment set up
- `npm i` to install the required dependencies
- OPTIONAL: create a file `.env` and provide environment variable `SERVER_URL` in /frontend
- `npm start` to run the application
- `npm test` to test both the back end and front end
- `cd frontend` and `npx cypress run` to run cypress integration tests

## Future development / missed requirements
- Styling could be refined and improved particularly for mobile
- Validation can be improved to use `Zod` or `Yup`
- More comprehensive tests for both BE and FE
- Better error handling and safety nets
- Theming for MUI components
- More back end endpoints such as GET quotes or GET/POST customer info for lead generation
- Fix some small user interaction bugs and improve the overall user experience
- Resolve babel dependency deprecation
- Redux or other state management for scalability
- Route guards
- Fix broken RTL tests in FE
- Extend Cypress tests

## Front-End Requirements

### Technology Stack

- **React v18** with **TypeScript**
- **Material UI** for component styling
- **React Router** for navigation and routes
- **React Hook Form** for form handling
- **Cypress** for end to end tests
- **React Testing Library** for component tests
- **Jest** for functional unit tests

### Personal and Loan Details forms

#### Personal Details

- **Fields**:
  - First name: string
  - Last name: string
  - Email: string (with regex to validate)
  - Employment Status (Employed, Self-Employed, Unemployed)
  - Employer Name (visible if employed)

- **Validation**:
  - Required: First name, last name, email, employment status, employer name (if employed)

#### Loan Details

- **Fields**:
  - Vehicle price (minimum $2000, choose a maximum)
  - Deposit (minimum $0, should not exceed vehicle price)
  - Loan Purpose (Vehicle, Home Improvement, etc.)
  - Loan Term (1-7 years)

- **Validation**:
  - All fields are required
  - Vehicle price - deposit > $2000

### Quote Page

- Render the quote response as a list of lenders matched with your loan requirements. 

## Back-End

- **Express** server with **TypeScript**
- **Swagger** for API documentation
- **Jest** for testing

### API Design

- **Endpoints**:
  - **POST /api/quote**: Submit data to server and return an array of potential quotes

### Security Practices

- Implemented middleware for input validation.
- Ensured secure data handling practices.
