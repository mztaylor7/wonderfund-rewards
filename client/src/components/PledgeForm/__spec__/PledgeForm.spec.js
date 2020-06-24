import React from 'react';
import { shallow } from 'enzyme';
import PledgeForm from '../PledgeForm';
import Theme from '../../Theme/Theme';

describe('PledgeForm Component', () => {
  let component;
  beforeEach(() => {
    component = shallow(
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
});
