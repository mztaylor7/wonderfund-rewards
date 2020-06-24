import React from 'react';
import { shallow } from 'enzyme';
import SplitContainer from '../SplitContainer';

describe('SplitContainer Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SplitContainer />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
