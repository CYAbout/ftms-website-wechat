import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import { Button, Icon } from 'antd-mobile';
// import { userApi } from './api';
import UserLayout from './components/layout';
import './index.less';

import Home from './home';

class Mine extends Component {

  constructor(props) {
    super(props)
    console.log(props)
  }

  state = {

  }

  componentDidMount() {
    // this.getLoveCars()
  }


  render() {

    return (
      <UserLayout>
        <Home />
      </UserLayout>
    );
  }
}

export default Mine;
