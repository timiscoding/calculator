import React from 'react';
import { shallow } from 'enzyme';
import Display from './Display';

describe('Display', () => {
  it('renders with prop `value`', () => {
    const value = '123';
    const wrapper = shallow(<Display value={value} />);
    expect(
      wrapper.text()
    ).toBe(value);
  });
});
