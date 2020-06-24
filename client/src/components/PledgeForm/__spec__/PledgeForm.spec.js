import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import PledgeForm from '../PledgeForm';
import Theme from '../../Theme/Theme';

describe('PledgeForm Component', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <Theme>
        <PledgeForm />
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
