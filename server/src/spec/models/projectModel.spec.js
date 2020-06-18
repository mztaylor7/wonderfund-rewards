/* eslint-disable mocha/no-setup-in-describe,mocha/no-hooks-for-single-case */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { sequelize, Sequelize } = require('sequelize-test-helpers');

chai.use(sinonChai);

describe('project model', function () {
  const MockProjectModel = proxyquire('../../models/projectModel.js', {
    sequelize: Sequelize
  });

  let MockProject;

  before(function () {
    MockProject = MockProjectModel.factory(sequelize);
    // MockProject.hasMany(Reward);
  });

  after(function () {
    MockProject.init.resetHistory();
  });

  it('should call Project.init with the correct attributes', function () {
    sinon.assert.calledWith(MockProject.init, MockProjectModel.attributes, {
      sequelize,
      modelName: 'project'
    });
  });
});
