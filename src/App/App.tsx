import {
  userInfoDefault,
  AuthenticationContext
} from "../authenticationContext/authenticationContext.ts";
import {Header} from "../components/Header/Header.tsx";
import {
  AuthenticationForm
} from "../components/AuthenticationForm/AuthenticationForm.tsx";
import {Layout} from "../components/Layout/Layout.tsx";
import {useCallback, useState} from "react";

function App() {

  const [userInfo, setUserInfo] = useState<UserInfo>(userInfoDefault)

  const updateAuthenticationContextInfo = useCallback((newUserInfo: UserInfo) => {
    const {isAuthenticated, email} = newUserInfo;

    if (isAuthenticated && email !== '') {
      setUserInfo({
        isAuthenticated: true,
        email: email
      })
    }

    if (!isAuthenticated) {
      setUserInfo({
        isAuthenticated: false,
        email: ''
      })
    }

  }, [])


  const authenticationContext = {
    userInfo,
    setUserInfo: updateAuthenticationContextInfo
  }

  return (
    <Layout>
      <AuthenticationContext.Provider value={authenticationContext}>
        <Header></Header>
        <AuthenticationForm/>
      </AuthenticationContext.Provider>
    </Layout>
  )
}

export {App}