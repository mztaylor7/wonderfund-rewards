import React from 'react';
import { shallow } from 'enzyme';
import SmallTitle from '../SmallTitle';

describe('SmallTitle Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SmallTitle />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
