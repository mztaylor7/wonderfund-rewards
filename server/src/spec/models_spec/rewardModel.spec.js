/* eslint-disable mocha/no-setup-in-describe,mocha/no-hooks-for-single-case */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { sequelize, Sequelize } = require('sequelize-test-helpers');

chai.use(sinonChai);

describe('reward model', function () {
  const MockRewardModel = proxyquire('../../models/rewardModel.js', {
    sequelize: Sequelize
  });

  let MockReward;

  before(function () {
    MockReward = MockRewardModel.factory(sequelize);
    // MockReward.hasMany(Reward);
  });

  after(function () {
    MockReward.init.resetHistory();
  });

  it('should call Reward.init with the correct attributes', function () {
    sinon.assert.calledWith(MockReward.init, MockRewardModel.attributes, {
      sequelize,
      modelName: 'reward'
    });
  });
});
