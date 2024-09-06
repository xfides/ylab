import {usersDatabase} from './database.ts'
import {sleepRandomMs} from "../../utils/utils.ts";

const RESPONSE_NOT_FOUND_USER: AuthenticatedResponseBad = {
  isAuthenticated: false,
  meta: {error: 'Пользователь не найден'}
}

const RESPONSE_WRONG_PASSWORD: AuthenticatedResponseBad = {
  isAuthenticated: false,
  meta: {error: 'Неправильные учетные данные'}
}

const RESPONSE_WRONG_REQUEST: AuthenticatedResponseBad = {
  isAuthenticated: false,
  meta: {error: 'Неверный формат запроса'}
}

async function actionAuthenticateUser(request: string) {

  const sleepOptions = {startMs: 500, endMs: 2000}
  void await sleepRandomMs(sleepOptions.startMs, sleepOptions.endMs)

  let requestData: AuthenticatedRequest;

  try {
    requestData = JSON.parse(request);
  } catch (err) {
    return JSON.stringify(RESPONSE_WRONG_REQUEST)
  }

  if (typeof requestData !== 'object') {
    return JSON.stringify(RESPONSE_WRONG_REQUEST)
  }

  const {email, passwordHash} = requestData as AuthenticatedRequest;
  const user = usersDatabase[email];

  if (!user) return JSON.stringify(RESPONSE_NOT_FOUND_USER)

  if (user.passwordHash !== passwordHash) {
    return JSON.stringify(RESPONSE_WRONG_PASSWORD)
  }

  const response: AuthenticatedResponseGood = {
    isAuthenticated: true,
    meta: {email: email}
  }
  return JSON.stringify(response)
}

export {actionAuthenticateUser}