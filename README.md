# "Simple Payments App" backend (REST API)
The repo contains the backend part of the "Simple Payments App". 
A deployed version ===> 

You can find a frontend part (done on React) here:

## A couple of words about the app
The "Simple Payments App" allows users to register and make payments to each other. 
All transactions can be viewed from the user's dashboard. The authentication requires just a nickname (yep, no passwords, and no email confirmation for simplicity). If there is no user with the entered nickname, a new user creates and his/her with 0$ on a balance. 

The user can send a certain amount of the "money" to another one, even if his balance is negative. 

A home page shows all registered users and their balances. A dashboard is protected by an authentication service. 

## Backend part
The backend part is the REST API with the following endpoints: 

/ - to get the information (name and balance) about all registered users;
/login - to log (or to create and log) user;
/makepayment - to transfer money from the user's account to another one (the user must be logged in);

## Technology stack:
- Node.js
- express
- MongoDB (the native driver)
- validator
- JSON Web Token