import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Container from '../Container';
import Theme from '../../../Theme/Theme';

describe('Container Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Theme>
        <Container />
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
