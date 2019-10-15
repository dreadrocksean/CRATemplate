import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LoginForm from './LoginForm';
import AppText from '../../core/AppText';
import TextInput from '../../core/formElements/TextInput';
import AppButton from '../../core/AppButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('LoginForm component renders the todo correctly', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<LoginForm />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

test('Expect component to be called at least once', () => {
  const wrapper = shallow(<LoginForm />);
  expect(wrapper.find(Card).length).toEqual(1);
  expect(wrapper.find(CardContent).length).toEqual(1);
  expect(wrapper.find(AppText).length).toEqual(1);
  expect(wrapper.find(TextInput).length).toEqual(2);
  expect(wrapper.find(AppButton).length).toEqual(1);
  expect(wrapper.find('.loginForm').length).toEqual(1);
});
