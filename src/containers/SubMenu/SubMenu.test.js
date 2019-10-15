import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import SubMenu from './SubMenu';

it('renders without crashing', () => {
  shallow(<SubMenu />);
});
