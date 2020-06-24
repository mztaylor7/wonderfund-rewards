import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../Modal';

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
    component = shallow(<Modal project={project} />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });
});
