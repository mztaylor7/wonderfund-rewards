import React from 'react';
import { shallow } from 'enzyme';
import AvatarCard from '../AvatarCard';

describe('AvatarCard Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<AvatarCard />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
