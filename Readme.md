created a nodejs  project and installed express.

created model.js and imported sequelize library in it which helps in connecting the  database to our application , creating table and performing crud operations.

created 3 required model objects in model.js i.e,: org , item and pricing and provided primary key and the required data to create a table for the same.

created index.js and imported objects from model.js

created endpoints for the crud operation required as mentioned in assignment.

the main agenda was to get a price so applied the required logic in the get_price function .
calculates price and updates in table


initialized port and assigned the port from .env file and applied the same to app.listen.