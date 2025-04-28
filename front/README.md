# E-Commerce MERN App 🛒

This is a full-stack e-commerce application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). It includes essential e-commerce features such as user authentication for secure login and registration, cart functionality to add, remove, and update items, and product management for listing, editing, and deleting products. Additionally, the application provides a "Know More" section with detailed product descriptions and a comments & ratings system, allowing users to leave reviews and rate products.

## Features  
- User authentication (JWT-based)  
- Product listings with categories  
- Shopping cart and checkout system  
- Responsive UI with Css 

## Getting Started  
Ensure you have the following installed:

- **Node.js** (v14.x or later)  
- **npm** (v6.x or later)  
- **MongoDB** (local installation or MongoDB Atlas account)  
- **Git**

### **Installation**  
Clone the repository and install dependencies:  

```bash
git clone https://github.com/Aloktripathi19/E-commerce-Application.git
cd ECOM
npm install
cd front
npm install
cd ../back
npm install 


## Run the Application  

### Start the backend server:  
cd back
npm start

### Start the frontend:  
cd front
npm start
```

## Technologies Used  
- **Frontend:** React.js, Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  

## Project Structure  

ECOM/
├── front/           # Frontend (React.js)
│   ├── public/      # Static assets
│   ├── src/         # React components and pages
│   │   ├── comp/    # Reusable components
│   │   ├── App.js   # Main app component
│   │   ├── index.js # React entry point
│   │   ├── App.css  # Global styles
│   │   ├── index.css# Main CSS file
│   ├── package.json # Frontend dependencies
│   ├── setupTests.js # Testing setup
│   ├── reportWebVitals.js # Performance monitoring
├── back/            # Backend (Node.js/Express.js)
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API endpoints
│   ├── package.json # Backend dependencies
├── README.md        # Project documentation
├── .gitignore       # Git ignore file
