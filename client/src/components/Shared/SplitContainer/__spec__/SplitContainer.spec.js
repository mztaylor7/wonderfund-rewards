import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SplitContainer from '../SplitContainer';

describe('SplitContainer Component', () => {
  let component;

  beforeEach(() => {
    component = mount(<SplitContainer />);
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
