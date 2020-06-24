import React from 'react';
import { shallow } from 'enzyme';
import LargeTitle from '../LargeTitle';

describe('LargeTitle Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<LargeTitle />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
