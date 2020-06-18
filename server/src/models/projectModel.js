const { Model, DataTypes } = require('sequelize');

const projectAtrs = {
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
    type: DataTypes.DATEONLY,
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

const factory = (sequelize) => {
  /* Init the Project Model Schema */
  class Project extends Model {}

  Project.init(projectAtrs, { sequelize, modelName: 'Project' });

  return Project;
};

module.exports.factory = factory;
module.exports.projectAtrs = projectAtrs;
