import React from 'react';
import { shallow } from 'enzyme';
import Description from '../Description';

describe('Description Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Description />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
