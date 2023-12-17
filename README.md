# El7a2ni Clinic & Pharmacy

El7a2ny is a comprehensive software solution designed to transform the healthcare experience for clinics, doctors, pharmacists, and patients. It streamlines and automates interactions between patients, medical professionals, and pharmacists, revolutionizing how healthcare services are accessed and delivered.




## Framework Tech Stack

Website is created using MERN Stack :

*Client:* React

*Server:* Express.js and Node.js (V16)

*Database* : MongoDB 

*Languages* : HTML, CSS, JavaScript

# Build Status

All functionalities are working properly except for the last 17

Functionalities : 

![functionalities](https://github.com/advanced-computer-lab-2023/Nomads-Clinic/assets/135381782/1d35a519-56ef-4c3d-a58c-7c6abf7839b7)


## Installation

Since The Project is MERN Stack, you need to have the following ready :

1- MongoDB cluster ready, have its link and add it in the .env file Here is El7a2ni's database link : 
//omar2244kamel2424:123acl321@cluster0.mhl2k91.mongodb.net/

2- install NodeJs V.16 on your terminal from nodejs.org

3- Nodemon https://www.npmjs.com/

4- Express https://www.npmjs.com/

5- Mongoose https://www.npmjs.com/

6- React https://www.npmjs.com/

You will also need the following for some functionalities :

7- JWT ( Json Web Token ) user for Authentication and Authorization

8- Axios https://www.npmjs.com/ for frontend fetching from backend as an API

9- MUI and Bootstrap for some frontend components


# Setup - Backend

After Installing the aforementioned dependencies, write the command

### npm init
for initial setup.


Backend works as follows :

*Models* : store the schema in the database for the required model

*Controllers* : include the actual functionality on all the required methods and its interaction with database

*Routes* : in order to define to the program which method to fetch from which controller whenever needed. In Our Project there is a separate route for several models : Admin , Address , Appointment , Available Time , Clinic Price , Doctor , Document , Family Member , Health Package , Health Record , Medicine , Order , Patient , Pharmacist , Prescription , Room 

*Middleware* : Middleware is software containing functions that execute during the request-response cycle and have access to both the request object (req) and the response object (res). Middleware is executed during the window between when a server receives a request and when it sends a response. We have Authentication Middleware that basically decrypts the JWT and makes sure the access is authorized for each specific user, it also protects the backend by allowing access to only specified user. 

*server.js* file, where the actual application run through scripts mentioned. Here, the connection with database is required from the config file, the port is specefied ( Our program's backend runs on port 9000 you can change this here or either in the .env file), require express to launch, and then use all the routes we created.


## API Reference (Routes)

-pharmacistRoutes

-medicineRoutes

-healthPackageRoutes

-availableTimeRoutes

-familyMemberRoutes

-prescriptionRoutes

-appointmentRoutes

-clinicPriceRoutes

-patientRoutes

-doctorRoutes

-adminRoutes

-healthRecordsRoutes





## Server-side usage

Prepare your secret
run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)
####  in the root level

$ cd server
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> src/.env
Start
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run dev // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file



## Backend Scripts

we’ll add some dependencies with 
### $ npm i express mongoose body-parser config 
Or to directly install all the packages 
### $ npm i 
express: Is our main framework

mongoose: Is used to connect and interact with MongoDB

config: This lets you define default parameters for your application

we’ll add nodemon as a dev dependency. Install it with $ npm i -D nodemon . To use nodemon, add "app": "nodemon app.js" to your scripts tag under the package.json file.
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. The app.js is the entry point for the application. It is also important to define a start script here with "start": "node app.js". This will define the start script of the application.




# Frontend 

## Initialization


Since this project will hold both the client application and the server application there will be node modules in two different places. First run npm install from the root. After this you will run npm start.

After installing react as mentioned above, frontend main structure is created using React, and this is done by typng the following command in the terminal 

`npx create-react-app frontend `
which will create a new folder called frontend with the basic structure. Make sure the port used for frontend is 3000 or change it from package.json file in the frontend folder

##  Frontend Structure
#### frontend - Holds the client application
- #### public - This holds all of our static files
- #### src
    - #### components - This folder holds all of the different components that will make up our views
    - #### context - This folder for authorization contexts
    - #### hooks - This folder is used for login, logout, and signup functionalities. This hook is called in the login and signup pages
    - #### pages - These represent a unique page on the website.
    - #### App.js - This is what renders all of our browser routes and different views
    - #### index.js - This is what renders the react app by rendering App.js, should not change
    - #### index.css,  - These are some styling files
- #### package.json - Defines npm behaviors and packages for the client

#### package.json - Defines npm behaviors like the scripts defined above in the README


# Use of Styled Components

 instead of using html classes and css files for styling each page we have used styled components library that enable us to write React Components that could inherit css styling from any html , mui or even another React component style and override that style.

## Frontend Scripts

In the project directory, you can run:

### npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Make sure the ports number are correct for the backend and frontend in order to connect them both together, this can be achieved through the package-json file.

### npm run eject

*Note: this is a one-way operation. Once you eject, you can't go back!*

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


# Scripts 


    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"



# Dependencies

Some of the dependencies and libraries you need to have in order to run the project as it is supposed to be are the follwoing 



   "@stripe/react-stripe-js": "^2.4.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.1",
    "mongoose": "^8.0.3",
    "navigate": "^0.3.6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "react-scripts": "^5.0.1",
    "socket.io-client": "^4.7.2",
    "stripe": "^14.9.0",
    "web-vitals": "^2.1.4"


# Frontend Process 

### 
This is the home page interface 
![functionalities](https://github.com/advanced-computer-lab-2023/Nomads-Clinic/assets/135381782/a83bec13-818a-47dd-9c1b-18424fa33191)



This is the Admin's page in the clinic

![admin-home](https://github.com/advanced-computer-lab-2023/Nomads-Clinic/assets/135381782/dc1c2c20-b033-4b2a-ad0d-b32af6889715)

This is the Patient's medicine page in the pharmacy

![patient-medicine](https://github.com/advanced-computer-lab-2023/Nomads-Clinic/assets/135381782/9e884ead-4dda-469c-9822-0abc947d71df)



# API and Communications

## JSPDF
jsPDF is an open-source library for generating PDF documents using JavaScript. It provides multiple options to generate PDF files, with custom properties.
 - Note : Image must be encoded in base64, this is done through https://www.base64-image.de/  for example
 
## Fetching Methods API
All methods created in the controller files should be added to the router file with their corresponding CRUD function. Then, these methods can be fetched to frontend in any component requested using the follwing as example : 

### 

const doctorId = doctor._id;
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch(`/api/doctors/document/${doctorId}`);
                const data = await response.json();
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchDocuments();
    }, [doctorId]);
            }
    })








## Hooks
Main Hooks used in this project are 
- #### UseState - We call it inside a function component to add some local state to it. React will preserve this state between re-renders. useState returns a pair: the current state value and a function that lets you update it. You can call this function from an event handler or somewhere else.


- #### UseEffect - adds the ability to perform side effects from a function component.


## Run Locally

Clone the project

bash
  git clone https://github.com/advanced-computer-lab-2023/Nomads-Clinic


Go to the project directory

bash
  cd my-project


Install dependencies

bash
  npm install


Start the server

bash
  npm start


# Testing

## Backend



You can test the frontend using localhost running on port 3000 ( or the specified port in case you change it) and type the name of page you want to access. 

- Note : user must have access to this page
- //



# Code Style

 Having a clear and consistent coding style is critical for any project, as it helps ensure the codebase is maintainable and future changes can be implemented without unexpected issues. Code reviews are essential for this process, as they provide oversight to ensure all code is written to the same standards and any discrepancies are identified and resolved quickly.

*Pair Programming*


Pair programming is a great way to help a team work better. Working together allows the team to share ideas, come up with solutions quickly, and learn from each other. It also builds friendships and strengthens the team. Pair programming divides difficult tasks into smaller parts, and having someone review the work helps ensure accuracy. Ultimately, pair programming is an excellent tool for improving efficiency, productivity, and collaboration.



 *Namings*

 For function names, we use camelCase, starting with a lowercase character. Using concise, human-readable, and semantic names where appropriate.

When defining a class, we use PascalCase (starting with a capital letter) for the class name and camelCase (starting with a lowercase letter) for the object property and method names.
*Backend Namings*

We decided to use convention namings for methods to represent their functionlities in the backend, export with the same name, and call them in the router with their same name for ease of testing and usage. Main objects to route to from the server.js file are the following :

And for each route file, we use the correct method name from the controller

*Frontend Namings*

Likewise, we name each component imported in a page with its first initial name, that also explains its functionality, and then create the router in App.js file using the same initial name, too, for easier navigation and tracing.

*Asynchronous Code*

Writing asynchronous code improves performance and should be used when possible. In particular, we use:
- async/await
We prefer using the simpler async/await syntax. Unfortunately, you can't use await at the top level unless you are in an ECMAScript module. CommonJS modules used by Node.js are not ES modules. If your example is intended to be used everywhere, avoid top-level await.

*Comments*

You will find explaining the implmentation of many methods and their applications.

You can find other comments on whole methods in code, this is because we intend not to delete a function that achieves different functionality because we might use some of its details later, so we comment it untel further usage.
In general, we use single-line comments to comment code. Writers must mark each line of the comment with //, so that it's easier to notice commented-out code visually. In addition, this convention allows to comment out sections of code using /* … */ while debugging.


*Strings*

For inserting values into strings, use template literals

bash

const name = "Ahmad";
console.log(`Hi! I'm ${name}!`);


*Errors*

You can find that we always output the type of error any function holds so that it helps in tracing and solving problems during implementation. Also, frontend uses these error to define the error type for the user to achieve responsivness.

console.log() is quiet used a lot for the similar intention, and it  encouraged to be used by the developer to trace errors and solve them.


# Credits 

https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA

https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg    

https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY

https://www.youtube.com/watch?v=fgTGADljAeg

https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK

https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h

https://youtu.be/hQAHSlTtcmY


# License

## Stripe

Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/


   Licensed under the Apache License, Version 2.0;
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
