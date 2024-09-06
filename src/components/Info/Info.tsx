import {PropsWithChildren} from "react";

function Info({children}: PropsWithChildren<{}>) {

  return (
    <div>{children}</div>
  )
}

export {Info}