import React from 'react';
import { shallow } from 'enzyme';
import ContinueButton from '../ContinueButton';

describe('ContinueButton Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ContinueButton />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
