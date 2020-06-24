import React from 'react';
import { shallow } from 'enzyme';
import Title from '../Title';

describe('Title Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Title />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
