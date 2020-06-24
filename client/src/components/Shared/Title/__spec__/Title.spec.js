import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Title from '../Title';
import Theme from '../../../Theme/Theme';

describe('Title Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Theme>
        <Title />
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
