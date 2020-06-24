import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import BackerHeading from '../BackerHeading';

import Theme from '../../../Theme/Theme';

describe('BackerHeading Component', () => {
  let component;
  let componentLowercase;
  beforeEach(() => {
    component = mount(
      <Theme>
        <BackerHeading activated uppercase />
      </Theme>
    );

    componentLowercase = mount(
      <Theme>
        <BackerHeading activated={false} uppercase={false} />
      </Theme>
    );
  });

  afterEach(() => {
    component.unmount();
    componentLowercase.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });

  it('should match the test snapshot for uppercase & activated heading', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should match the test snapshot for lowercase & de-activated heading', () => {
    expect(toJson(componentLowercase)).toMatchSnapshot();
  });
});
