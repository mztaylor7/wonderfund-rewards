import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SubHeading from '../SubHeading';
import Theme from '../../../Theme/Theme';

describe('SubHeading Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Theme>
        <SubHeading />
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
