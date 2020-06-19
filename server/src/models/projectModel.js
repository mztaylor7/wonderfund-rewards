const { Model, DataTypes } = require('sequelize');

/**
 * Project Model Attributes
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
  subtitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  heroImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  heroVideo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  launchDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  campaignDuration: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  budget: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  fundingGoal: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
};

/**
 * Factory Function to create Model
 * This implementation is explicitly used to unit test model creation
 * Sequelize does not have build in unit testing functionality so the npm package used to test is
 * 'sequelize-test-helpers'
 * @param sequelize Sequelize Instance
 * @returns {Project} The Project Model
 */
const factory = (sequelize) => {
  class Project extends Model {}

  Project.init(attributes, { sequelize, modelName: 'project' });
  return Project;
};

/* Export the factory and attributes */
module.exports.factory = factory;
module.exports.attributes = attributes;
