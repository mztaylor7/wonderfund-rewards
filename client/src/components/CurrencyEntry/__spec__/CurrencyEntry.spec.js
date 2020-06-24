import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CurrencyEntry from '../CurrencyEntry';
import { Input } from '../CurrencyEntry.style';

describe('CurrencyEntry Component', () => {
  let component;
  let handleChangeMock;

  beforeEach(() => {
    handleChangeMock = jest.fn();
    component = mount(<CurrencyEntry input={0} setInput={handleChangeMock} />);
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

  it('should allow the user to enter numbers into the text box', () => {
    component.find(Input).simulate('change', { target: { value: 1 } });
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
  });
});
