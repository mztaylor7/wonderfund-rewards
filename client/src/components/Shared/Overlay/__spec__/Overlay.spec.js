import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Overlay from '../Overlay';
import Theme from '../../../Theme/Theme';

describe('Overlay Component', () => {
  let component;
  const mockFn = jest.fn();
  beforeEach(() => {
    component = mount(
      <Theme>
        <Overlay activated={false} setActivated={mockFn} />
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

  it('should return am empty fragment if the "activated" prop is true', () => {
    component.unmount();
    component = shallow(<Overlay activated />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should close the modal when description button is clicked', () => {
    component.simulate('click', () => {});
    expect(mockFn).toHaveBeenCalled();
  });
});
