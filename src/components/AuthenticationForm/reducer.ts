import {AuthenticationFormInitialState} from "./initialState.ts";

const ActionName = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  RESET_ALL_FIELDS: 'RESET_ALL_FIELDS',
  VALIDATE_FIELD: 'VALIDATE_FIELD',
  START_SENDING: 'START_SENDING_DATA',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_ERROR: 'SET_ERROR',
  SET_IDLE: 'SET_IDLE'
} as const

type UpdateFieldAction = {
  type: typeof ActionName.UPDATE_FIELD;
  payload: { idField: string, value: string }
}

type ValidateFieldAction = {
  type: typeof ActionName.VALIDATE_FIELD;
  payload: { idField: string, value: string }
}

type ResetAllFieldsAction = { type: typeof ActionName.RESET_ALL_FIELDS }

type StartSendingAction = { type: typeof ActionName.START_SENDING }

type SetIdleAction = { type: typeof ActionName.SET_IDLE }

type SetSuccessAction = { type: typeof ActionName.SET_SUCCESS }

type SetErrorAction = {
  type: typeof ActionName.SET_ERROR,
  payload: string[]
}

type Action =
  | UpdateFieldAction
  | ValidateFieldAction
  | ResetAllFieldsAction
  | SetIdleAction
  | StartSendingAction
  | SetSuccessAction
  | SetErrorAction

type SelectActionByType<T extends string> = Extract<Action, { type: T }>;


function updateField(
  state: AuthenticationForm,
  actionPayload: SelectActionByType<typeof ActionName.UPDATE_FIELD>['payload']
) {
  const {idField, value: newValue} = actionPayload;
  const field = state.fields[idField]

  if (!field) return state;
  if (newValue === field.value) return state;

  return {
    ...state,
    fields: {
      ...state.fields,
      [idField]: {
        ...state.fields[idField],
        value: newValue
      }
    }
  };
}

function validateField(
  state: AuthenticationForm,
  actionPayload: SelectActionByType<typeof ActionName.UPDATE_FIELD>['payload']
) {
  const {idField, value: newValue} = actionPayload;
  const field = state.fields[idField]

  if (!field) return state;
  if (!field.validationRule) return state

  const isFieldValid = field.validationRule.validateFn(newValue);
  if (isFieldValid && field.errorMsg === '') return;
  if (!isFieldValid && field.errorMsg !== '') return;

  if (isFieldValid) {
    return {
      ...state,
      fields: {
        ...state.fields,
        [idField]: {
          ...state.fields[idField],
          errorMsg: ''
        }
      }
    };
  } else {
    return {
      ...state,
      fields: {
        ...state.fields,
        [idField]: {
          ...state.fields[idField],
          errorMsg: field.validationRule.defaultErrorMsg
        }
      }
    };
  }
}

function updateFormMeta(
  state: AuthenticationForm,
  actionPayload: AuthenticationForm['meta']
) {
  const {status: newStatus, errors} = actionPayload

  if (newStatus === "PENDING" || newStatus === "SUCCESS") {
    return {
      ...state,
      meta: {
        ...state.meta,
        status: newStatus,
      }
    }
  }

  if (newStatus === "ERROR") {
    return {
      ...state,
      meta: {
        status: newStatus,
        errors: errors ? errors : []
      }
    }
  }

  if (newStatus === "IDLE") {
    return {
      ...state,
      meta: {
        status: newStatus,
        errors: []
      }
    }
  }


}

function AuthenticationFormReducer(
  state: AuthenticationForm = AuthenticationFormInitialState,
  action: Action
) {
  let newState;

  switch (action.type) {
    case ActionName.UPDATE_FIELD: {
      newState = updateField(state, action.payload)
      break;
    }

    case ActionName.VALIDATE_FIELD: {
      newState = validateField(state, action.payload)
      break;
    }

    case ActionName.RESET_ALL_FIELDS: {
      newState = AuthenticationFormInitialState
      break;
    }

    case ActionName.START_SENDING: {
      newState = updateFormMeta(state, {status: 'PENDING'})
      break;
    }

    case ActionName.SET_SUCCESS: {
      newState = updateFormMeta(state, {status: 'SUCCESS'})
      break;
    }

    case ActionName.SET_ERROR: {
      newState = updateFormMeta(
        state,
        {status: 'ERROR', errors: action.payload}
      )
      break;
    }

    case ActionName.SET_IDLE: {
      newState = updateFormMeta(state, {status: 'IDLE'})
      break;
    }

    default:
      newState = state;
      break;
  }

  if (!newState) return state

  return newState
}

export {AuthenticationFormReducer, ActionName}