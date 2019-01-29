import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-g-analytics'
import Root from '@router/root'
import * as serviceWorker from './serviceWorker'

const supportsHistory = 'pushState' in window.history // 检测浏览器是否支持History操作

ReactDOM.render(
  <BrowserRouter
    id="UA-92314993-4"
    basename='/'
    forceRefresh={!supportsHistory} // 不支持的话注入强制刷新模式
  >
    <Root/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
