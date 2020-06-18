const { Sequelize, sequelize } = require('../database');

/* Init the Project Model Schema */
class Reward extends Sequelize.Model {}

Reward.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    pledgeAmount: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    deliveryMonth: {
      type: Sequelize.STRING,
      allowNull: false
    },
    deliveryYear: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    shippingType: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rewardQuantity: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    timeLimit: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    rewardItems: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    }
  },
  { sequelize, modelName: 'reward' }
);

module.exports = Reward;
