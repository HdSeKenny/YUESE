import React, { Component } from 'react';
import { Layout } from 'antd';

export default class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      style: {
        textAlign: 'left'
      },
      description: 'YUE SE ©2018 Created by Kenny'
    };
  }

  render() {
    const { style, description } = this.state;
    return (
      <Layout.Footer style={style}>{description}</Layout.Footer>
    );
  }
}
