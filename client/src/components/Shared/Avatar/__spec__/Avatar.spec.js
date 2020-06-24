import React from 'react';
import { mount } from 'enzyme';

import toJson from 'enzyme-to-json';
import Avatar from '../Avatar';

describe('Avatar Component', () => {
  let component;

  beforeEach(() => {
    component = mount(<Avatar />);
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
