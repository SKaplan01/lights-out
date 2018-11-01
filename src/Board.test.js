import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Board from './Board';

it('renders without crashing', function() {
  shallow(<Board />);
});

it('matches snapshot', function() {
  let wrapper = shallow(<Board difficulty={0} />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it('handles click', function() {
  let wrapper = mount(<Board nrows={3} ncols={3} difficulty={0} />);

  let elem = wrapper.find('.Cell').first();
  elem.simulate('click');
  console.log('wrapper state', wrapper.state());
  expect(wrapper.state().board[0][0]).toBe(true);
  expect(wrapper.state().board[0][1]).toBe(true);
  expect(wrapper.state().board[1][0]).toBe(true);
});

it('checks for win and renders correct message', function() {
  let wrapper = mount(<Board nrows={1} ncols={1} difficulty={1} />);

  let elem = wrapper.find('.Cell').first();
  elem.simulate('click');
  console.log('wrapper state', wrapper.state());
  expect(wrapper.state().hasWon).toBe(true);
  expect(wrapper.html()).toContain('You won');
});
