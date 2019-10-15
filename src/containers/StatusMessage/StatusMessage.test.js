import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import StatusMessage from './StatusMessage';

it('renders without crashing', () => {
  shallow(<StatusMessage />);
});
