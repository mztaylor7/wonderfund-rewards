const express = require('express');
const paramPluck = require('../middleware/paramPluck');
const projectController = require('../controllers/projectController');

const router = express.Router();
const {
  getOneProject,
  deleteOneProject,
  createOneProject,
  replaceOneProject,
  getAllProjects,
  updateOneProject
} = projectController;

router.route('/').get(getAllProjects).post(createOneProject);

router.use(paramPluck);

router
  .route('/find')
  .get(getOneProject)
  .put(replaceOneProject)
  .patch(updateOneProject)
  .delete(deleteOneProject);

module.exports = router;
