import React from 'react';
import { mount, shallow } from 'enzyme';

import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import RewardViewer from '../RewardViewer';
import Theme from '../../Theme/Theme';

describe('RewardViewer Component', () => {
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

  let component;

  const mockGetRewards = jest.fn().mockResolvedValue({ data: [mockReward] });

  beforeEach(() => {
    component = shallow(
      <Theme>
        <RewardViewer getRewards={mockGetRewards} />
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

  it('should correctly call setState during after component mounts', async () => {
    component.unmount();

    component = mount(
      <Theme>
        <RewardViewer getRewards={mockGetRewards} />
      </Theme>
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });

    expect(mockGetRewards).toHaveBeenCalled();
  });
});
