import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
} from 'react';

import {
  Field,
  HelpMessage,
  FieldInput,
  withInputClassModifier,
} from '@axa-fr/react-toolkit-form-core';
import { InputManager } from '@axa-fr/react-toolkit-core';
import Date from './CustomDate';

type Props = ComponentPropsWithoutRef<typeof Field> &
  ComponentPropsWithRef<typeof Date> & {
    inputFieldClassModifier: string;
    inputClassModifier: string;
    helpMessage?: ReactNode;
    children?: ReactNode;
  };

const DateInput = ({
  classModifier,
  inputClassModifier,
  inputFieldClassModifier,
  message,
  children,
  helpMessage,
  id,
  classNameContainerLabel,
  classNameContainerInput,
  label,
  messageType,
  isVisible,
  forceDisplayMessage,
  className,
  name,
  value,
  disabled,
  ...otherProps
}: Props) => {
  if (!isVisible) {
    return null;
  }
  const inputId = InputManager.getInputId(id);
  return (
    <Field
      label={label}
      id={inputId}
      message={message}
      messageType={messageType}
      isVisible={isVisible}
      forceDisplayMessage={forceDisplayMessage}
      className={className}
      classModifier={classModifier}
      classNameContainerLabel={classNameContainerLabel}
      classNameContainerInput={classNameContainerInput}>
      <FieldInput
        className="af-form__date"
        classModifier={inputFieldClassModifier}>
        <Date
          name={name}
          id={inputId}
          value={value}
          classModifier={inputClassModifier}
          disabled={disabled}
          {...otherProps}
        />
        {children}
      </FieldInput>
      <HelpMessage message={helpMessage} isVisible={!message} />
    </Field>
  );
};

export default withInputClassModifier(DateInput);
