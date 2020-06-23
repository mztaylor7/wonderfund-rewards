/* Import modules */
const express = require('express');
const paramPluck = require('../middleware/paramPluck');
const projectController = require('../controllers/projectController');

/* Initialize the router &
 * Get all of the controller functions
 * */
const router = express.Router();
const {
  getUserImage,
  getOneProject,
  deleteOneProject,
  createOneProject,
  getAllProjects,
  updateOneProject
} = projectController;

/* Initialize all routes for the '/' route */
router.route('/').get(getAllProjects).post(createOneProject);

/* Init all routes for the '/find' route */
router.get('/find', paramPluck, getOneProject);
router.put('/find', paramPluck, updateOneProject);
router.patch('/find', paramPluck, updateOneProject);
router.delete('/find', paramPluck, deleteOneProject);

/* Route for getting user image */
router.get('/user', paramPluck, getUserImage);

/* Export this module */
module.exports = router;
