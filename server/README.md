This is the CryptoCollabServer!

Below this line I will discuss how the server side of my application runs. I will go in depth for each folder and the files contained within. 

===============================================================================================================

CONTROLLERS: 
---------------------------------------------------------------------------------------------------------------
1) collabcontroller.js --> This JS file provides the logic for controlling the collab endpoints. There is full CRUD within and some extra: a create collab endpoint (POST), a get all of my collabs endpoint (GET), a get my collab endpoint (GET), an update collab endpoint (PUT), a delete collab endpoint (DELETE), and an admin delete collab endpoint (DELETE).

2) commentcontroller.js --> This JS file provides the logic for controlling the comment endpoint. This allows users to comment on their own collabs as well as other's. 

3) cryptocontroller.js --> This JS file provides the logic for controlling the crypto endpoints. There is full CRUD within and some extra: a create crypto endpoint (POST), a get all of my cryptos endpoint (GET), a get my crypto endpoint (GET), an update crypto endpoint (PUT), a delete crypto endpoint (DELETE), and an admin delete crypto endpoint (DELETE).

4) index.js --> This JS file handles the organization of the controllers I am exporting. Within you can find me exporting the collabController, the commentController, the cryptoController, and the userController.

5) usercontroller.js --> This JS file provides the logic for controlling the login and register endpoints. There are two endpoints: a user register endpoint and a user login endpoint. Each have authorization functionality that allow a logged in user to complete specific tasks special to that user.
---------------------------------------------------------------------------------------------------------------

MIDDLEWARE:
---------------------------------------------------------------------------------------------------------------
1) header.js --> This JS file specifies the additional information that will be passed between the client and server.

2) index.js --> This JS file handles the organization of the middleware I am exporting. 

3) validate-jwt.js --> This JS file handles the token validation (for user register, then login) in order for specific routes to be protected (ex: a user creates a collab, only he/she have the rights to edit/delete the collab)

4) validateadmin.js --> This JS file handles the validation for an admin to be able to delete collabs and cryptos that are not permitted on the application. 
---------------------------------------------------------------------------------------------------------------

MODELS:
---------------------------------------------------------------------------------------------------------------
1) collab.js --> This JS file is necessary in order for the creation of table columns within the collab table itself. Information regarding each collab created will be listed here. This is essentially the database object model that connect to the postgres database. 

2) comment.js --> This JS file is necessary in order for the creation of table columns within the comment table itself. Information regarding each comment created will be listed here. This is essentially the database object model that connect to the postgres database.

3) crypto.js --> This JS file is necessary in order for the creation of table columns within the collab table itself. Information regarding each collab created will be listed here. This is essentially the database object model that connect to the postgres database.

4) index.js --> This JS file handles the organization of all four of the models I have within this application. Associations between cryptos, collabs, and comments are coded here. Without database associations, how would you comment on some else's collab?

5) user.js --> This JS file is necessary in order for the creation of table columns within the user table. Information regarding each user created will be listed here. This is essentially the database object model that connect to the postgres database.
---------------------------------------------------------------------------------------------------------------

APP.JS --> The most important JS file of them all. It sets up the middleware for our application, tells us what PORT our server is running on, and connects our database (SQL) to our server.
---------------------------------------------------------------------------------------------------------------

DB.JS --> This JS file handles the database creation and eventual connection. This will create a new instance of sequelize.
---------------------------------------------------------------------------------------------------------------