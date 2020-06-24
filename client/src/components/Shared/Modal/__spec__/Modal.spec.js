import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../Modal';
import Theme from '../../../Theme/Theme';

describe('Modal Component', () => {
  let component;

  const project = {
    creator: 'Bob',
    location: 'Home',
  };

  // add a div with #modal-root id to the global body
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  beforeEach(() => {
    component = mount(
      <Theme>
        <Modal project={project} />
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
