import React, { Component } from 'react';
import { Layout } from 'antd';

export default class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      style: {
        textAlign: 'left'
      },
      description: 'YUE SE ©2018 Created by '
    };
  }

  render() {
    const { style, description } = this.state;
    return (
      <Layout.Footer style={style}>{description}<a href="https://github.com/HdSeKenny">XIAXIABAO</a></Layout.Footer>
    );
  }
}
