type Email = string;
type Password = string;
type PasswordHash = string;

interface AuthenticatedRequestParameters {
  email: Email,
  password: Password
}

interface AuthenticatedRequest {
  email: Email,
  passwordHash: PasswordHash
}

interface AuthenticatedResponseBad {
  isAuthenticated: false,
  meta?: { error: string }
}

interface AuthenticatedResponseGood {
  isAuthenticated: true,
  meta: { email: Email }
}

type AuthenticatedResponse =
  AuthenticatedResponseBad
  | AuthenticatedResponseGood

interface UserInfo {
  isAuthenticated: boolean,
  email: string
}

interface AuthenticationContextInfo {
  userInfo: UserInfo,
  setUserInfo: (newUserInfo: UserInfo) => void
}

//    ----    ----    ----

type InputType = 'text' | 'number' | 'email'

interface InputCore {
  id: string,
  type: InputType,
  label: string,
  value: string,
  disabled: boolean,
  errorMsg: string,
  validationRule?: {
    validateFn: (val: string) => boolean
    defaultErrorMsg: string
  }
}

type FormStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'

interface AuthenticationForm {
  fields: {
    [idField: string]: InputCore
  }
  meta: {
    status: FormStatus,
    errors?: string[]
  }
}

type FormApi = {
  updateField: (idField: string, newValue: string) => void,
  validateField: (idField: string, newValue: string) => void
  resetAllFields: () => void,
  sendData: (parameters: AuthenticatedRequestParameters) => void
}