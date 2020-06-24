import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import GradientCard from '../GradientCard';
import Theme from '../../Theme/Theme';

describe('GradientCard Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Theme>
        <GradientCard />
      </Theme>
    );
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
