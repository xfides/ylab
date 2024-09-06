import {useCallback, useContext} from "react";
import {
  AuthenticationContext
} from "../../authenticationContext/authenticationContext.ts";
import {Button} from "../Button/Button.tsx";

function Header() {

  const authenticationContext = useContext(AuthenticationContext)
  const {userInfo, setUserInfo} = authenticationContext
  const {isAuthenticated, email} = userInfo
  const greeting = isAuthenticated ? `привет ${email}` : 'Привет, гость';
  const logoutFn = useCallback(() => {
    setUserInfo({isAuthenticated: false, email: ''});
  }, [])

  return (
    <div>
      <header>
        Это заголовок проекта
        {greeting}
        {isAuthenticated
          ? <Button logicFn={logoutFn}>выйти</Button>
          : null
        }
      </header>
      <br/>
    </div>
  )
}

export {Header}