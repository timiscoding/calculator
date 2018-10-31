import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './ButtonGrid';

const onClick = jest.fn();
const value = 'add';
const klass = 'add';
const children = 'Add';

const button = ({
  customClass = klass,
  customChildren = children,
} = {}) => (
  <Button onClick={onClick} value={value} klass={customClass}>
    {customChildren}
  </Button>
);

describe('Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(button());
  });

  afterEach(() => {
    onClick.mockClear();
  });

  it('renders a button', () => {
    expect(
      wrapper.containsMatchingElement(<button>{children}</button>)
    ).toBe(true);
  });

  it('renders without class `operator`', () => {
    expect(
      wrapper.props().className
    ).toContain(`button ${klass}`);
  });

  it('renders with class `operator`', () => {
    const customClass = 'add';
    wrapper = shallow(button({ customClass }));
    expect(
      wrapper.props().className
    ).toContain(`button ${customClass} operator`);
  });

  it('renders with a prop `value`', () => {
    expect(
      wrapper.props().value
    ).toBe(value);
  });

  describe('when user clicks button', () => {
    it('should call prop `onClick`', () => {
      wrapper.simulate('click');

      expect(
        onClick.mock.calls.length
      ).toBe(1);
    });
  });
});
