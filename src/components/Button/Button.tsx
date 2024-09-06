import {MouseEventHandler, PropsWithChildren} from "react";

function Button({disabled = false, logicFn, children}: PropsWithChildren<{
  disabled?: boolean,
  logicFn: () => void
}>) {

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    logicFn();
  }

  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  )
}

export {Button}