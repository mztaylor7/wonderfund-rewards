import React from 'react';
import { shallow } from 'enzyme';
import BackerHeading from '../BackerHeading';

describe('BackerHeading Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<BackerHeading />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
