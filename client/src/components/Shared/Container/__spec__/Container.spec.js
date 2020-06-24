import React from 'react';
import { shallow } from 'enzyme';
import Container from '../Container';

describe('Container Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Container />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
