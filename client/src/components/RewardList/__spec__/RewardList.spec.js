import React from 'react';
import { shallow } from 'enzyme';
import RewardList from '../RewardList';

describe('RewardList Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<RewardList rewardItems='Test1,Test2,Test3' />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
