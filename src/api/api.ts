import {actionAuthenticateUser} from "../server/mock/endPoints.ts";
import {digestMessage} from "../utils/utils.ts"

async function requestAuthenticateUser({
  email,
  password
}: AuthenticatedRequestParameters) {
  console.log('requestAuthenticateUser function called')

  const passwordHash = await digestMessage(password)
  const requestData: AuthenticatedRequest = {email, passwordHash}
  const requestString = JSON.stringify(requestData)

  const responseString = await actionAuthenticateUser(requestString)

  try {
    return JSON.parse(responseString) as AuthenticatedResponse
  } catch (err) {
    return {
      isAuthenticated: false,
      meta: {error: 'некорректный ответ от сервера'}
    } satisfies AuthenticatedResponseBad
  }

}

export {requestAuthenticateUser}