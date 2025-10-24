import {
  UIInput as InternalInput,
  UIInputNumber,
  UIInputPassword,
  UIInputTextArea,
} from './input';

type CompoundedComponent = typeof InternalInput & {
  TextArea: typeof UIInputTextArea;
  Password: typeof UIInputPassword;
  Number: typeof UIInputNumber;
};

export const UIInput = InternalInput as CompoundedComponent;

UIInput.TextArea = UIInputTextArea;
UIInput.Password = UIInputPassword;
UIInput.Number = UIInputNumber;

export { UIInputNumber, UIInputPassword, UIInputTextArea };
