# "Simple Payments App" backend (REST API)
The repo contains the backend part of the "Simple Payments App". 
A deployed version ===> https://simple-payments-api.herokuapp.com/api/users (see below, what else endpoints are available)

You can find a frontend part (done on React) here:

## A couple of words about the app
The "Simple Payments App" allows users to register and make payments to each other. 
All transactions can be viewed on the user's dashboard. The authentication requires just a nickname (yep, no passwords, and no email confirmation for simplicity). If there is no user with the entered nickname, a new user is created with 0$ on a balance. 

The user can send a certain amount of the "money" to another one, even if his balance is negative. 

A home page shows all registered users and their balances. A dashboard is protected by an authentication service based on JSON web Token. 

## Backend part
The backend part is the REST API with the following endpoints: 

- /api/users/ - for getting the information (name and balance) about all registered users;
- /api/users/login - for logging (or creating and logging) the user;
- /api/users/makepayment - for transferring money from the user's account to another one (the user must be logged in);

## Technology stack:
- Node.js
- express.js
- MongoDB (the native driver)
- validator.js
- JSON Web Token (jsonwebtoken.js)
