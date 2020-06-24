import React from 'react';
import { shallow } from 'enzyme';
import RewardViewer from '../RewardViewer';

describe('RewardViewer Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<RewardViewer />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
