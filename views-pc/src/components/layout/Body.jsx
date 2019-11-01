import React, {Suspense, lazy} from 'react'
import { Route, Switch, HashRouter, Redirect } from "react-router-dom"; //引入路由控制
import configs from '../../router'

class Body extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Redirect exact from="/" to="/article"></Redirect>
          <Suspense fallback={<div>loading...</div>}>
            { this.formatAllRoutes() }
          </Suspense> 
        </Switch>
      </HashRouter>
    )
  }

  formatAllRoutes() {
    const routes = Object.keys( configs ).map( key => {
      const com =  configs[key].map( ( config ) => {
        return (
          <Route 
            path={config.path} 
            key={config.name} 
            component={lazy(config.component)}></Route>
        )
      })
      return com
    })
    return routes
  }
}

export default Body
