import { observer } from 'mobx-react'
import React from 'react'

import Layout from './components/Layout'

const App = () => {
  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default observer(App)
