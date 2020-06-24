import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../Avatar';

describe('Avatar Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Avatar />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
