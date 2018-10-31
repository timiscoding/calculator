import React from 'react';
import { mount } from 'enzyme';
import { default as Calc, state } from './Calc';

describe('Calc', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Calc />);
  });

  it('should set state `value` to 0', () => {
    expect(
      wrapper.state().value
    ).toBe('0');
  });

  describe('when `1` button is clicked', () => {
    beforeEach(() => {
      const btn = wrapper.find('Button[value=1]').first();
      btn.simulate('click');
    });

    it('should set state for `1`', () => {
      expect(
        wrapper.state()
      ).toEqual({
        value: '1',
        expr: '1',
        state: state.REPL_NUM
      });
    });

    describe('then `clear` button is clicked', () => {
      it('should set state to clear', () => {
        const btn = wrapper.find('Button[value="clear"]').first();
        btn.simulate('click');
        expect(
          wrapper.state()
        ).toEqual({
          value: '0',
          expr: '',
          state: state.CLEAR
        });
      })
    });
  });

  describe('when `+` button is clicked', () => {
    it('should not alter state', () => {
      const btn = wrapper.find("Button[value='+']").first();
      btn.simulate("click");
      expect(
        wrapper.state()
      ).toEqual({
        value: '0',
        expr: '',
        state: state.INIT
      });
    });
  });

  describe('when a `.` is pressed', () => {
    it('should set state for `.`', () => {
      wrapper.simulate('keydown', { key: '.' });
      expect(
        wrapper.state()
      ).toEqual({
        value: '0.',
        expr: '.',
        state: state.ADD_DOT
      });
    });
  });

  describe('when a `2` is pressed', () => {
    beforeEach(() => {
      wrapper.simulate("keydown", { key: "2" });
    });

    it('should set state for `2`', () => {
      expect(
        wrapper.state()
      ).toEqual({
        value: '2',
        expr: '2',
        state: state.REPL_NUM
      });
    });

    describe('then `3` is pressed', () => {
      beforeEach(() => {
        wrapper.simulate("keydown", { key: "3" });
      });

      it('should set state for `23`', () => {
        expect(
          wrapper.state()
        ).toEqual({
          value: '23',
          expr: '23',
          state: state.APPEND_NUM
        });
      });

      describe('then `=` is pressed', () => {
        it('should set state for `23=`', () => {
          wrapper.simulate('keydown', { key: '=' });
          expect(
            wrapper.state()
          ).toEqual({
            value: '23',
            expr: '',
            state: state.EVAL
          });
        });
      });

      describe('then `4` is pressed', () => {
        it('should set state for `234`', () => {
          wrapper.simulate("keydown", { key: "4" });
          expect(wrapper.state()).toEqual({
            value: '234',
            expr: "234",
            state: state.APPEND_NUM
          });
        });
      });

      describe('then `-` is pressed', () => {
        it('should set state for `23-`', () => {
          wrapper.simulate("keydown", { key: "-" });
          expect(wrapper.state()).toEqual({
            value: '23',
            expr: "23-",
            state: state.APPEND_EXPR
          });
        });
      });
    });

    describe('then `+` is pressed', () => {
      beforeEach(() => {
        wrapper.simulate('keydown', { key: '+' });
      });

      it('should set state for `2+`', () => {
        expect(
          wrapper.state()
        ).toEqual({
          value: '2',
          expr: '2+',
          state: state.APPEND_EXPR
        });
      });

      describe('then `5` is pressed', () => {
        it('should set state for `2+5`', () => {
          wrapper.simulate("keydown", { key: "5" });
          expect(
            wrapper.state()
          ).toEqual({
            value: '5',
            expr: '2+5',
            state: state.REPL_NUM
          });
        });
      });

      describe("then `/` is pressed", () => {
        it('should set state for `2/`', () => {
          wrapper.simulate("keydown", { key: "/" });
          expect(wrapper.state()).toEqual({
            value: '2',
            expr: "2/",
            state: state.AMEND_EXPR
          });
        });
      });

      describe("then `.` is pressed", () => {
        beforeEach(() => {
          wrapper.simulate("keydown", { key: "." });
        });

        it("should set state for `2+.`", () => {
          expect(wrapper.state()).toEqual({
            value: '0.',
            expr: "2+.",
            state: state.ADD_DOT
          });
        });

        describe("then `7=` is pressed", () => {
          beforeEach(() => {
            wrapper.simulate("keydown", { key: "7" });
            wrapper.simulate("keydown", { key: "=" });
          });

          it('should set state for `2.7=`', () => {
            expect(wrapper.state()).toEqual({
              value: '2.7',
              expr: "",
              state: state.EVAL
            });
          });
        });
      });
    });

    describe('then `Enter` is pressed', () => {
      beforeEach(() => {
        wrapper.simulate("keydown", { key: "Enter" });
      });

      it('should set state for `2=`', () => {
        expect(wrapper.state()).toEqual({
          value: '2',
          expr: "",
          state: state.EVAL
        });
      });

      describe('then `4` is pressed', () => {
        it('should set state for `2=4`', () => {
          wrapper.simulate("keydown", { key: "4" });
          expect(wrapper.state()).toEqual({
            value: '4',
            expr: "4",
            state: state.REPL_NUM
          });
        });
      });
    });

    describe('then a `.` is pressed', () => {
      beforeEach(() => {
        wrapper.simulate('keydown', { key: '.' });
      });

      it('should set state for `2.`', () => {
        expect(
          wrapper.state()
        ).toEqual({
          value: '2.',
          expr: '2.',
          state: state.ADD_DOT
        });
      });

      describe('then a `6` is pressed', () => {
        beforeEach(() => {
          wrapper.simulate('keydown', { key: '6' });
        });

        it('should set state for `2.6`', () => {
          expect(
            wrapper.state()
          ).toEqual({
            value: '2.6',
            expr: '2.6',
            state: state.APPEND_NUM
          });
        });

        describe('then a `.` is pressed', () => {
          beforeEach(() => {
            wrapper.simulate('keydown', { key: '.' });
          });

          it('should set state for `2.6.`', () => {
            expect(
              wrapper.state()
            ).toEqual({
              value: '2.6',
              expr: '2.6',
              state: state.APPEND_NUM
            });
          });
        });
      });

      describe('then a `.` is pressed', () => {
        beforeEach(() => {
          wrapper.simulate('keydown', { key: '.' });
        });

        it('should set state for `2..`', () => {
          expect(
            wrapper.state()
          ).toEqual({
            value: '2.',
            expr: '2.',
            state: state.ADD_DOT
          });
        });
      });
    });
  });
});
