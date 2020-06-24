import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
