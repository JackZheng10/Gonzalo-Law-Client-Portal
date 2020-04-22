# Files Overview #

* config - Contains initialization and set up code
* routes - Contains express functions that route requests made from front end to back end.
* models - Contains schema for Users and Projects, for Mongo Db
* keys - Contains API KEY to upload and downolad files to Google Cloud.

### Controllers ###
* calendarController.js - Contains functions that make calls to Google's Calendar API to use the calendar 
* fileController.js - Contains functions that make calls to Google's Cloud API to store files.
* loginRegisterController.js - Contains functions that verify user login.
* pwdControllerRecovery.js - Contains back end code to recover passwords.
* userController.js - Gets information about users and projects by making API calls to MongoDb.
