import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PostEditor from './PostEditor';

Enzyme.configure({ adapter: new Adapter() });

describe('<PostEditor />', () => {
  it('should render without errors', () => {
    const wrapper = shallow(
      <PostEditor handleSubmit={() => {}} handleCancel={() => {}} />
    );
  });
});
