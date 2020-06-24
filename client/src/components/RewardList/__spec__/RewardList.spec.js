import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RewardList from '../RewardList';
import Theme from '../../Theme/Theme';

describe('RewardList Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Theme>
        <RewardList rewardItems='Test1,Test2,Test3' />
      </Theme>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });

  it('should return am empty fragment if the "activated" prop is true', () => {
    component.unmount();
    component = shallow(
      <RewardList activated rewardItems='Test1,Test2,Test3' />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should match the test snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
