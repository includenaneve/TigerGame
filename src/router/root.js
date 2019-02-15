import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import DefaultPage from '@components/DefaultPage/DefaultPage'

import Home from '@views/Home/Home'
import Auth from '@views/Auth/Auth'
import Result from '@views/Result/Result'
import Weixin from '@views/Weixin/Weixin'
import MusicPlayer from '@views/MusicPlayer/MusicPlayer'

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/home" component={Home}/>
          <Route path="/result/:godArr" component={Result}/>
          <Route path="/weixin" component={Weixin}/>
          <Route component={() => <DefaultPage text="页面找不到啦~"/>}/>
        </Switch>
        <Route children={location => {
          return <MusicPlayer pathname={location.pathname}/>
        }}></Route>
      </Fragment>
    )
  }
}
// withRouter高阶组件提供了history、location、match供我们使用。通过props传递。
const Root = withRouter(Main)

export default Root