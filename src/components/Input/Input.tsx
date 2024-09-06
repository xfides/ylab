import {ChangeEventHandler, FocusEvent, useCallback} from "react";

function Input(props: InputCore & { formApi: FormApi }) {
  const {label, type, id, value, errorMsg, disabled, formApi} = props

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const newValue = event.target.value
    if (newValue === value) return;

    formApi.updateField(id, newValue)
  }, [])

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    formApi.validateField(id, newValue)
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span>{errorMsg}</span>
    </div>
  )
}


export {Input}