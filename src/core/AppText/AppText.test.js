import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import AppText from './AppText';

const text = 'test123';

it('renders without crashing', () => {
  shallow(<AppText>{text}</AppText>);
});

test('renders children correctly', () => {
  const wrapper = shallow(<AppText>{text}</AppText>);
  expect(wrapper.contains(<div>{text}</div>)).toEqual(true);
});
