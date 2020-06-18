const { Model, DataTypes } = require('sequelize');

/**
 * Reward Model Attributes
 */
const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  pledgeAmount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deliveryMonth: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deliveryYear: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  shippingType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rewardQuantity: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  timeLimit: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  rewardItems: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
};

/**
 * Factory Function to create Model
 * This implementation is explicitly used to unit test model creation
 * Sequelize does not have build in unit testing functionality so the npm package used to test is
 * 'sequelize-test-helpers'
 * @param sequelize Sequelize Instance
 * @returns {Reward} The Reward Model
 */
const factory = (sequelize) => {
  class Reward extends Model {}

  Reward.init(attributes, { sequelize, modelName: 'reward' });
  return Reward;
};

/* Export the factory and attributes */
module.exports.factory = factory;
module.exports.attributes = attributes;
