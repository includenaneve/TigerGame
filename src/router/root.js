import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import DefaultPage from '@components/DefaultPage/DefaultPage'

import Home from '@views/Home/Home'
import Auth from '@views/Auth/Auth'
import Weixin from '@views/Weixin/Weixin'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/home" component={Home}/>
        <Route path="/weixin" component={Weixin}/>
        <Route component={() => <DefaultPage text="页面找不到啦~"/>}/>
      </Switch>
    )
  }
}
// withRouter高阶组件提供了history、location、match供我们使用。通过props传递。
const Root = withRouter(Main)

export default Root