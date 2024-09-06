import {createContext} from "react";

const userInfoDefault: UserInfo = {
  isAuthenticated: false,
  email: ''
}

const authenticationContextInfoDefault: AuthenticationContextInfo = {
  userInfo: userInfoDefault,
  setUserInfo: () => {}
}

const AuthenticationContext = createContext<AuthenticationContextInfo>(
  authenticationContextInfoDefault
)

export {
  userInfoDefault,
  authenticationContextInfoDefault,
  AuthenticationContext
}