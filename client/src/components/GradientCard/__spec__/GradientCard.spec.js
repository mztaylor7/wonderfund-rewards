import React from 'react';
import { shallow } from 'enzyme';
import GradientCard from '../GradientCard';

describe('GradientCard Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<GradientCard />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
