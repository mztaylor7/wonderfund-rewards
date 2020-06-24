import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import AvatarCard from '../AvatarCard';
import Theme from '../../Theme/Theme';
import Description from '../../Shared/Description/Description';
import { DescCollapseBtn } from '../../Shared/Description/Description.style';
import Modal from '../../Shared/Modal/Modal';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('AvatarCard Component', () => {
  const mockReward = {
    title: 'Handcrafted Metal Bacon',
    pledgeAmount: 535,
    description:
      'Dolorem nulla distinctio temporibus fuga quibusdam qui qui cum sint. Consequatur quia corporis optio non inventore ab qui labore. Quam necessitatibus iure qui. Fuga laborum error. Optio minima quibusdam optio eum.',
    deliveryMonth: 'November',
    deliveryYear: 2020,
    shippingType: 'vertical',
    rewardQuantity: 55709,
    timeLimit: 69840,
    projectId: 1,
    rewardItems: 'Bike,Table,Shirt,Hat,Cheese',
  };

  const mockProject = {
    title: 'Fantastic Granite Table',
    creator: 'Bob',
    subtitle: 'Fundamental incremental extranet',
    category: 'Games',
    subcategory: 'Handcrafted',
    location: 'West Prudence, CA',
    heroImage: 'http://lorempixel.com/640/480/nature',
    heroVideo: 'https://ytroulette.com/',
    launchDate: '2021-03-15T21:00:17.200Z',
    campaignDuration: 132,
    budget: 530,
    fundingGoal: 564,
    rewards: [mockReward],
  };

  let component;

  const mock = new MockAdapter(axios);
  mock.onGet(/.*/).reply(200, [mockProject]);

  beforeEach(async () => {
    component = mount(
      <Theme>
        <AvatarCard />
      </Theme>
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
  });

  afterEach((done) => {
    component.unmount();
    done();
  });

  it('should render without failure', () => {
    expect(component).toBeDefined();
  });

  it('should not show the Modal by default', () => {
    expect(component.find(Modal).length).toEqual(0);
  });

  it('should show the modal when description button is clicked', () => {
    // add a div with #modal-root id to the global body
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

    const desc = component.find(Description);
    expect(desc.length).toEqual(1);
    const descButton = desc.find(DescCollapseBtn);
    descButton.simulate('click', () => {});
    expect(component.find(Modal).length).toEqual(1);
  });

  it('should match the test snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
