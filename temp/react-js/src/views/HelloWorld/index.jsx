import './style.less'

import { Button } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'

import baseStore from '@/store'

const HelloWorld = observer(() => {
  const [baseState] = React.useState(() => baseStore)

  return (
    <div className="hello-world">
      <h3>Hello world!</h3>
      <p>{baseState.count}</p>
      <Button type="primary" onClick={() => baseState.increment()}>
        +1
      </Button>
      <Button type="primary" onClick={() => baseState.decrement()}>
        -1
      </Button>
    </div>
  )
})

export default HelloWorld
