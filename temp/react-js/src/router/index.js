import { lazy } from 'react'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: lazy(() => import('@/views/HelloWorld'))
  }
]

export default routes
