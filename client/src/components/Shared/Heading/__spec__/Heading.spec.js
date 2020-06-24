import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Heading from '../Heading';
import Theme from '../../../Theme/Theme';

describe('Heading Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Theme>
        <Heading />
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
