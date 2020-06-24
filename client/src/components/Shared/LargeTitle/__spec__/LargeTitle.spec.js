import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import LargeTitle from '../LargeTitle';
import Theme from '../../../Theme/Theme';

describe('LargeTitle Component', () => {
  let component;
  let componentLowercase;

  beforeEach(() => {
    component = mount(
      <Theme>
        <LargeTitle uppercase />
      </Theme>
    );

    componentLowercase = mount(
      <Theme>
        <LargeTitle uppercase={false} />
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

  it('should match the test snapshot for lowercase lettering', () => {
    expect(toJson(componentLowercase)).toMatchSnapshot();
  });
});
