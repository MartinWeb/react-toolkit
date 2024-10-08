import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pass from '../Pass';
import PassInput from '../PassInput';

describe('Form/PassInput/Pass', () => {
  test('Pass display correctly', () => {
    const { asFragment } = render(
      <Pass name="passwordtest" onToggleType={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('password')).toBeInTheDocument();
  });
});

describe('<Pass />', () => {
  describe('Call onChange callback when type value', () => {
    it('Swith from password to text type', () => {
      const onChange = jest.fn();

      render(
        <Pass
          onChange={onChange}
          onToggleType={jest.fn()}
          id="testid"
          name="passwordtest"
        />
      );

      userEvent.type(screen.getByRole('password'), 'changed value');

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: 'changed value',
          }),
        })
      );
    });
  });

  describe('ToggleType when eye icon is clicked', () => {
    it('Switch from password to text type', () => {
      const onToggleType = jest.fn();

      render(
        <Pass onToggleType={onToggleType} id="testid" name="passwordtest" />
      );

      userEvent.click(screen.getByRole('button'));
      expect(onToggleType).toHaveBeenCalled();
    });
  });
});

describe('<PassInput />', () => {
  describe('onChange', () => {
    it('Check score password when score = 0, strength is bad', () => {
      const { container } = render(
        <PassInput
          id="password-id"
          label="Password"
          name="passwordtest"
          score="0"
        />
      );

      userEvent.type(screen.getByRole('password'), 'sam');
      const divContainer = container.querySelector('div.af-form__pass');
      expect(divContainer).toHaveClass('af-form__pass--bad');
    });

    it('Switch from text to password type', () => {
      const { getByRole, getByLabelText } = render(
        <PassInput id="password-id" label="Password" name="passwordtest" />
      );
      const btn = getByLabelText('show password');
      userEvent.click(btn);
      userEvent.click(btn);
      expect(getByRole('password')).toHaveAttribute('type', 'password');
    });
  });
});
