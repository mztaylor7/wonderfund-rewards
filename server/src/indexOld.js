/* Import Modules */
const path = require("path");

/* Set the Environmental Variables from the config file
 *  NOTE: for this server to function correctly, the config variables must be set
 * in the /config/.env file - this file does not exist if this project has been cloned from github.
 * Create a '.env' file in the 'config' folder and populate it with these variables
 * ----------------------
 * PORT:<port number>
 * DATABASE_NAME:<database name>
 * DATABASE_USER:<database username>
 * DATABASE_PASSWORD:<database password>
 * ----------------------
 * */
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

/* App must be imported after the Environment Variables have been loaded
   or it will not have access to the variables*/
const database = require("./database");
const app = require("./app");

/* If we are not running a test environment - make the sequelize database connection
 *  If a test suite is running - we will be making connections in the test suites
 * */
if (process.env.NODE_ENV !== "test") {
  database.createSequelizeConnection();
}

// Start the server listening on the predefined PORT variable
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});

// Export the server module
module.exports = server;
