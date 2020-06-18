/* eslint-disable mocha/no-setup-in-describe,mocha/no-hooks-for-single-case */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { sequelize, Sequelize } = require('sequelize-test-helpers');

chai.use(sinonChai);

describe('project model', function() {
  const { DataTypes } = Sequelize;

  const MockProjectModel = proxyquire('../../models/projectModel.js', {
    sequelize: Sequelize
  });

  let MockProject;

  before(function() {
    MockProject = MockProjectModel.factory(sequelize);
  });

  after(function() {
    MockProject.init.resetHistory();
  });

  it('called Project.init with the correct parameters', function() {
    sinon.assert.calledWith(
      MockProject.init,
      {
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
      },
      {
        sequelize,
        modelName: 'Project'
      }
    );
  });
});
