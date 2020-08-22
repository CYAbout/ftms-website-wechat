import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/common/header'
import Footer from './components/common/footer'
import NotFound from './components/common/notFound'
import Routers from './router/index'
import ScrollToTop from './components/scrolltotop'
import Gotop from './components/common/gotop'
import { getParamsObj } from './utils/util'
import { setScrollApp } from './redux/scroll.redux'
import { comApi } from './components/api';
import './app.less'
import { Object } from 'core-js';

@connect(
  state => state,
  { setScrollApp }
)
class App extends Component {

  state = {
    showGoTop: true
  }

  componentWillMount() {
    this.updateUserInfo()
  }

  componentDidMount() {
    // this.props.getUserInfo()
    // this.addScroll()
    this.updateUserInfo()
    // console.log('componentDidMount')
    const path = window.location
    // console.log(path)
    if (path.pathname.startsWith('/3d/mobile/')) {
      this.setState({
        showGoTop: false
      })
    }
  }
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', f => f);
  // }
  // shouldComponentUpdate(nextProps,nextState) {
  //   if(nextProps.scrollValue.scrollApp != this.props.scrollValue.scrollApp) {
  //     return false
  //   }
  //   return true
  // }
  // addScroll = () => {
  //   window.addEventListener('scroll',() => {
  //     this.props.setScrollApp()
  //   })
  // }
  updateUserInfo() {
    const urlAccessToken = getParamsObj().token
    console.log(urlAccessToken, 'fjdsajfdkslajfdklajflk---=-=-=-=')
    if (urlAccessToken) {
      let userInfoObj = localStorage.getItem('userInfo')
      if(userInfoObj) {
        userInfoObj = JSON.parse(userInfoObj) 
      } else {
        userInfoObj = {}
      }
      userInfoObj.accessToken = urlAccessToken
      localStorage.setItem('userInfo', JSON.stringify(
        userInfoObj
      ))
      comApi.isLogging()
        .then(res => {
          if (res && res.code == 0) {
            localStorage.removeItem('userInfo')
            localStorage.setItem('userInfo', JSON.stringify(res.data))
          }
        })

    }
  }

  render() {
    const { isShowModal, scrollApp } = this.props.scrollValue
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const token = userInfo && userInfo.accessToken
    const { showGoTop } = this.state
    // console.log(token)
    // const token = true
    
    window.freshShareInfo();
    return (
      <BrowserRouter>
        <div
          className='app'
        >
          {/*<Header />*/}
          <div className="main">
            <ScrollToTop>
              <Switch>
                {
                  Routers.map((item, index) => {
                    return <Route key={index} path={item.path} exact render={props =>
                      (!item.needAuth ? (<item.component {...props} />)
                        :
                        (token ? <item.component {...props} />
                          :
                          <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                          }} />
                        ))} />
                  })
                }
                <Route component={NotFound} />
              </Switch>
            </ScrollToTop>
          </div>
          {
            showGoTop && <Gotop />
          }
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
