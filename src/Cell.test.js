import React from 'react';
import { shallow } from 'enzyme';
import Cell from './Cell';

it('renders without crashing', function() {
  shallow(<Cell />);
});
