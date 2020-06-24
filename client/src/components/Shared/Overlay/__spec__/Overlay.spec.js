import React from 'react';
import { shallow } from 'enzyme';
import Overlay from '../Overlay';

describe('Overlay Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Overlay />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
