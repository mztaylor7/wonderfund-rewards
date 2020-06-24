import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
import App from '../App';
import GlobalStyles from '../App.style';

describe('App Component', () => {
  let component;

  beforeEach(() => {
    component = mount(<App />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should contain the global style', () => {
    renderer.create(<GlobalStyles />);
    expect(document.head).toMatchSnapshot();
  });

  it('should match the test snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
