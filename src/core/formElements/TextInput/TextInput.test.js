import React from 'react';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';
import TextInput from './TextInput';

const props = {
  type: 'text',
  handleChange: () => console.log('handling change'),
  value: 'Test Value',
};

it('renders without crashing', () => {
  shallow(<TextInput {...props} />);
});

describe('TextInput component renders correctly', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<TextInput {...props} />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

test('Expect component to be called at least once', () => {
  const wrapper = shallow(<TextInput {...props} />);
  expect(wrapper.find('.textInput').length).toEqual(1);
});
