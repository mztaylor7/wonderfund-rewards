import React from 'react';
import { shallow } from 'enzyme';
import Card from '../Card';

describe('Card Component', () => {
  let component;

  const reward = {
    id: 1,
    title: 'Placeholder',
    pledgeAmount: 'Placeholder',
    description: 'Placeholder',
    deliveryMonth: 'Placeholder',
    deliveryYear: 2020,
    rewardQuantity: 1,
    rewardItems: 'Test1,Test2,Test3',
  };
  beforeEach(() => {
    component = shallow(<Card reward={reward} />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
