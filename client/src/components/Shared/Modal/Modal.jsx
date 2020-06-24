import React from 'react';
import ReactDOM from 'react-dom';
import { Fader, InfoCard } from './Modal.style';
import styles from './Modal.module.scss';

import Heading from '../Heading/Heading';
import SubHeading from '../SubHeading/SubHeading';

const Modal = ({ modalOpen, setModalOpen, project }) => {
  const { creator, location } = project;

  const renderModal = () => {
    const toggleModal = (e) => {
      e.stopPropagation();
      console.log(e.target);
      setModalOpen(false);
    };

    return (
      <Fader onClick={toggleModal}>
        <InfoCard onClick={(e) => e.stopPropagation()}>
          <p>About the creator</p>
          <Heading heavy>{creator}</Heading>
          <SubHeading>{location}</SubHeading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            consequatur dicta, eveniet exercitationem laborum minus mollitia
            neque odio perferendis, placeat quod rem ut voluptates. Consequuntur
            est in iure minima perspiciatis? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Ad cumque doloremque maxime, nihil non
            omnis sapiente. Commodi inventore molestias ratione reiciendis
            sequi. Asperiores beatae eos id nam quam quidem vero! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Ad corporis deleniti,
            distinctio esse, labore modi odit officiis pariatur provident qui
            rerum veniam veritatis! Ad doloremque fuga harum suscipit vitae.
            Modi! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Corporis cupiditate temporibus voluptate! Aliquid deserunt dicta
            expedita hic libero nihil qui sed. Cumque debitis dolorem earum enim
            ipsa modi tempora ut!
          </p>
          <div className={styles.flex}>
            <div className={styles.flexColumn}>
              <ul>
                <li>
                  <i className='fas fa-check' style={{ color: '#009E74' }} />
                </li>
                <li>
                  <i className='fas fa-lock' />
                </li>
                <li>
                  <i className='fab fa-facebook' style={{ color: '#39579A' }} />
                </li>
                <li>
                  <i
                    className='fab fa-kickstarter-k'
                    style={{ color: '#057362' }}
                  />
                </li>
              </ul>
            </div>
            <div className={styles.flexColumn}>
              <ul>
                <li>{creator}</li>
                <li>Last login</li>
                <li>Not connected</li>
                <li style={{ color: '#27A47E' }}>1 created · 0 backed</li>
              </ul>
            </div>
          </div>
        </InfoCard>
        <span>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <u onClick={toggleModal}>Close</u>
        </span>
      </Fader>
    );
  };

  return ReactDOM.createPortal(
    renderModal(),
    document.getElementById('modal-root')
  );
};

export default Modal;
