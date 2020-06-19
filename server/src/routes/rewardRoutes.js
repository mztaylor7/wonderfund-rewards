/* Import modules */
const express = require('express');
const paramPluck = require('../middleware/paramPluck');
const rewardController = require('../controllers/rewardController');

/* Initialize the router &
 * Get all of the controller functions
 * */
const router = express.Router();
const {
  getRewards,
  deleteOneReward,
  createOneReward,
  updateOneReward
} = rewardController;

/* Init all routes for the '/find' route */
router.get('/', paramPluck, getRewards);
router.post('/', paramPluck, createOneReward);
router.put('/', paramPluck, updateOneReward);
router.patch('/', paramPluck, updateOneReward);
router.delete('/', paramPluck, deleteOneReward);

/* Export this module */
module.exports = router;
