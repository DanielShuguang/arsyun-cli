import './style.scss'

import { Button } from 'antd'
import { useObserver } from 'mobx-react'
import React from 'react'

import baseStore from '@/store'

const HelloWorld: React.FC = () => {
  const baseState = useObserver(() => baseStore)

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
}

export default HelloWorld
