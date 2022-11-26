import { FC } from 'react'
import { Provider } from 'react-redux'
import './app.less'

import configStore from "./store"

const stroe = configStore()

const App:FC = ({children}) => {
  return <Provider store={stroe}>
    {children}
  </Provider>
}

export default App
