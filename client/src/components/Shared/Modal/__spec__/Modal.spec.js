import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../Modal';
import Theme from '../../../Theme/Theme';
import { Fader, InfoCard } from '../Modal.style';

describe('Modal Component', () => {
  let component;

  const project = {
    creator: 'Bob',
    location: 'Home',
  };

  const mockModalFn = jest.fn();

  // add a div with #modal-root id to the global body
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  beforeEach(() => {
    component = mount(
      <Theme>
        <Modal setModalOpen={mockModalFn} project={project} />
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

  it('should hide the modal when the close button is clicked', () => {
    const fader = component.find(Fader);
    fader.simulate('click', () => {});
    expect(mockModalFn).toHaveBeenCalled();
  });

  it('should not close the modal when the info card is clicked', () => {
    const fader = component.find(InfoCard);
    fader.simulate('click', () => {});
    expect(mockModalFn).toHaveBeenCalledTimes(0);
  });
});
