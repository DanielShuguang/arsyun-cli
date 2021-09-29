import { FC, memo, Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import routes from '@/router'

const Layout: FC = memo(() => {
  return (
    <HashRouter>
      <Switch>
        <Suspense fallback={<div>loading...</div>}>
          {routes.map(route => {
            const { component: C, exact, path } = route
            return (
              <Route
                path={path}
                exact={exact ?? true}
                component={C}
                key={path}
              />
            )
          })}
        </Suspense>
      </Switch>
    </HashRouter>
  )
})

export default Layout
