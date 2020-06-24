import React from 'react';
import { shallow } from 'enzyme';
import Heading from '../Heading';

describe('Heading Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Heading />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
