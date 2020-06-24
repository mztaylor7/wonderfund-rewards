import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Card from '../Card';
import Theme from '../../Theme/Theme';

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
    component = mount(
      <Theme>
        <Card reward={reward} />
      </Theme>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });

  it('should match the test snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
