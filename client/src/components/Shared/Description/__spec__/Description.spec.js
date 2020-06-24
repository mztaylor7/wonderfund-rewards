import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Description from '../Description';
import Theme from '../../../Theme/Theme';

describe('Description Component', () => {
  let component;
  let componentV2;
  let componentV3;

  beforeEach(() => {
    component = mount(
      <Theme>
        <Description activated descOpen descClicked={() => {}} />
      </Theme>
    );

    componentV2 = mount(
      <Theme>
        <Description activated={false} descOpen={false} />
      </Theme>
    );

    componentV3 = mount(
      <Theme>
        <Description activated descOpen={false} />
      </Theme>
    );
  });

  afterEach(() => {
    component.unmount();
    componentV2.unmount();
    componentV3.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });

  it('should match the test snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should return an empty fragment if the "activated" prop is false', () => {
    expect(toJson(componentV2)).toMatchSnapshot();
  });

  it('should return an "Read More..." if the "activated" prop is true and the "descOpen" prop is false', () => {
    expect(toJson(componentV3)).toMatchSnapshot();
  });
});
