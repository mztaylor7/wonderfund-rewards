import React from 'react';
import { mount } from 'enzyme';

import toJson from 'enzyme-to-json';
import RewardViewer from '../RewardViewer';
import Theme from '../../Theme/Theme';

describe('RewardViewer Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Theme>
        <RewardViewer />
      </Theme>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });

  it('should match the test snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
