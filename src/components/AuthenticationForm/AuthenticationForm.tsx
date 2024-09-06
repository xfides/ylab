import {useContext, useMemo, useReducer} from "react";
import {AuthenticationFormInitialState} from "./initialState.ts"
import {AuthenticationFormReducer, ActionName} from "./reducer.ts"
import {Input} from "../Input/Input.tsx";
import {Button} from "../Button/Button.tsx";
import {Info} from "../Info/Info.tsx";
import {requestAuthenticateUser} from '../../api/api.ts'
import {
  AuthenticationContext
} from "../../authenticationContext/authenticationContext.ts";

function showNiceErrors(errors?: string[]) {
  if (Array.isArray(errors) && errors.length > 0) {
    return errors.map((oneError, index) => {
      return <i key={index}>{oneError}</i>
    })
  }

  return '';
}

function AuthenticationForm() {

  const [formState, dispatch] = useReducer(
    AuthenticationFormReducer,
    AuthenticationFormInitialState,
  )

  const fields = formState.fields

  const authenticationContext = useContext(AuthenticationContext)
  const {setUserInfo} = authenticationContext

  const formApi = useMemo<FormApi>(() => {
      return {
        updateField: (idField, newValue) => {
          dispatch({
            type: ActionName.UPDATE_FIELD,
            payload: {idField, value: newValue}
          })
        },
        validateField: (idField, newValue) => {
          dispatch({
            type: ActionName.VALIDATE_FIELD,
            payload: {idField, value: newValue}
          })
        },
        resetAllFields: () => {
          dispatch({
            type: ActionName.RESET_ALL_FIELDS,
          })
        },
        sendData(parameters: AuthenticatedRequestParameters) {
          dispatch({type: ActionName.START_SENDING})

          requestAuthenticateUser(parameters).then((response) => {
            if (!response.isAuthenticated) {
              dispatch({
                type: ActionName.SET_ERROR,
                payload: response?.meta?.error ? [response?.meta?.error] : [],
              })
            } else {
              dispatch({type: ActionName.SET_SUCCESS})
              setUserInfo({isAuthenticated: true, email: response.meta.email})
            }

            setTimeout(() => {dispatch({type: ActionName.SET_IDLE})}, 4000)
          }).catch((error) => {
            dispatch({
              type: ActionName.SET_ERROR,
              payload: [error.toString()],
            })
          })

        }
      }
    }, []
  )

  const handleSubmitData = () => {
    const fields = formState.fields;
    const fieldIds = Object.keys(fields);
    const shortFields = fieldIds.map((fieldId) => {
      return {
        id: fields[fieldId].id,
        value: fields[fieldId].value,
        errorMsg: fields[fieldId].errorMsg
      }
    })

    if (shortFields.some((oneField) => oneField.errorMsg !== '')) return;

    const userData = shortFields.reduce((acc, oneField) => {
      if (oneField.id.startsWith('email')) return {
        ...acc, email: oneField.value
      }

      if (oneField.id.startsWith('password')) return {
        ...acc, password: oneField.value
      }

      return acc

    }, {email: '', password: ''})

    formApi.sendData(userData)
  }

  //    ----    ----    ----

  const inputElements = Object.keys(fields).map((idField) => {
    const oneField = fields[idField];
    return (
      <Input
        key={idField}
        label={oneField.label}
        type={oneField.type}
        value={oneField.value}
        id={oneField.id}
        disabled={oneField.disabled}
        errorMsg={oneField.errorMsg}
        formApi={formApi}
      />
    )
  })


  return (
    <form>

      <div>
        Неправильно рассчитал силы и время. Уже надо сдавать работу, поэтому
        можно считать это черновой попыткой
        <ol>
          <li>- нет стилизации</li>
          <li>- есть баги</li>
          <li>- код не прибран</li>
        </ol>
        Но!
        <ol>
          <li>- Есть интересная эмуляция сервера с задержкой ответа</li>
          <li>- проект написан с TypeScript без any</li>
          <li>- используется Context</li>
        </ol>
      </div>

      <br/>

      <div>
        Пример учетные данных для проверки -
        логин: zayac@gmail.com , пароль: fairhaired
      </div>

      <br/>
      <br/>

      {inputElements}


      <div>
        <Button logicFn={handleSubmitData}>
          Войти
        </Button>
        <Button logicFn={formApi.resetAllFields}>
          Сбросить все поля
        </Button>
      </div>

      <Info>
        {formState.meta.status === 'PENDING'
          ? 'Ожидаем ответа от сервера'
          : ''
        }
      </Info>
      <Info>{showNiceErrors(formState.meta.errors)}</Info>
    </form>
  )
}

export {AuthenticationForm}