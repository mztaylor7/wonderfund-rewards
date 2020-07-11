const { Sequelize, Model, DataTypes} = require('sequelize');
const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST
} = process.env;

var sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: 'postgres'
})

const rewardAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    allowNull: false
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

const projectsAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creator: {
    type: DataTypes.STRING,
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

class Rewards extends Model {}

Rewards.init( rewardAttributes, { sequelize, modelName: 'rewards' });

class Projects extends Model {}

Projects.init(projectsAttributes, { sequelize, modelName: 'projects' });

module.exports.sequelize = sequelize;
module.exports.Rewards = Rewards;
module.exports.Projects = Projects;