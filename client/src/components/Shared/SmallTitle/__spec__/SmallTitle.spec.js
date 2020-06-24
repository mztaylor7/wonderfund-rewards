import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SmallTitle from '../SmallTitle';
import Theme from '../../../Theme/Theme';

describe('SmallTitle Component', () => {
  let component;
  let componentLowercase;

  beforeEach(() => {
    component = mount(
      <Theme>
        <SmallTitle uppercase />
      </Theme>
    );

    componentLowercase = mount(
      <Theme>
        <SmallTitle uppercase={false} />
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
