import React from 'react';
import { shallow } from 'enzyme';
import CurrencyEntry from '../CurrencyEntry';

describe('CurrencyEntry Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CurrencyEntry />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
