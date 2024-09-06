import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {usersDatabase} from "./server/mock/database.ts";
import {App} from "./App/App.tsx";

console.log('usersDatabase', usersDatabase);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
)

