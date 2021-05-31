import { makeAutoObservable } from 'mobx'

class BaseStore {
  constructor() {
    this.count = 0

    makeAutoObservable(this)
  }

  increment = () => {
    this.count++
  }

  decrement = () => {
    this.count--
  }
}

const baseStore = new BaseStore()

export default baseStore
