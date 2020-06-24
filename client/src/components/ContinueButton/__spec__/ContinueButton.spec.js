import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ContinueButton from '../ContinueButton';

describe('ContinueButton Component', () => {
  let component;

  beforeEach(() => {
    component = mount(<ContinueButton />);
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
