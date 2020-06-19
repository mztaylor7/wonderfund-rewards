/* Import modules */
const express = require('express');
const paramPluck = require('../middleware/paramPluck');
const projectController = require('../controllers/projectController');

/* Initialize the router &
 * Get all of the controller functions
 * */
const router = express.Router();
const {
  getOneProject,
  deleteOneProject,
  createOneProject,
  replaceOneProject,
  getAllProjects,
  updateOneProject
} = projectController;

/* Initialize all routes for the '/' route */
router.route('/').get(getAllProjects).post(createOneProject);

/* Use param pluck middleware on all routes below this point*/
router.use(paramPluck);

/* Init all routes for the '/find' route */
router
  .route('/find')
  .get(getOneProject)
  .put(replaceOneProject)
  .patch(updateOneProject)
  .delete(deleteOneProject);

/* Export this module */
module.exports = router;
