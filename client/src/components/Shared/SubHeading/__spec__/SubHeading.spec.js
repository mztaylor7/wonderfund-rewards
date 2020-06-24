import React from 'react';
import { shallow } from 'enzyme';
import SubHeading from '../SubHeading';

describe('SubHeading Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SubHeading />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
