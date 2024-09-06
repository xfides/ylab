import {
  createValidatePasswordFnByLength,
  generateUniqueId,
  validateEmail
} from "../../utils/utils.ts";

const emailInputId = generateUniqueId('email');
const passwordInputId = generateUniqueId('password');

const EmailInitialState: InputCore = {
  id: emailInputId,
  type: 'email',
  value: '',
  label: 'Введите почту',
  disabled: false,
  errorMsg:'',
  validationRule: {
    validateFn: validateEmail,
    defaultErrorMsg: "Неправильный формат почты"
  }
}

const PasswordInitialState: InputCore = {
  id: passwordInputId,
  type: 'text',
  value: '',
  label: 'Введите пароль',
  disabled: false,
  errorMsg:'',
  validationRule: {
    validateFn: createValidatePasswordFnByLength(8),
    defaultErrorMsg: "мало символов"
  }
}

const AuthenticationFormInitialState: AuthenticationForm = {
  fields: {
    [emailInputId]: EmailInitialState,
    [passwordInputId]: PasswordInitialState
  },
  meta: {
    status: 'IDLE',
    errors: []
  },
}


export {AuthenticationFormInitialState}




