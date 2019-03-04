import React, { Component } from 'react'
import { Layout, Menu, message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { EventClient } from '../../utils'
import { UserService } from '../../services'

const { Header } = Layout

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      style: {
        lineHeight: '64px',
        float: 'right'
      },
      logo: {
        width: '60px',
        height: '32px',
        uri: '/assets/logo/logo.png'
      }
    }
  }

  logout = () => {
    message.success('成功退出')
    localStorage.removeItem('current_user')
    localStorage.removeItem('id_token')
    window.location.reload()
  }

  componentDidMount() {
    this.getCurrentUser()
    EventClient.on('login_success', () => this.getCurrentUser())
  }

  getCurrentUser = () => {
    if (localStorage.getItem('id_token')) {
      UserService.getCurrentUser().then((data) => {
        this.setState({ currentUser: data })
      }).catch(err => console.log(err))
    }
  }

  render() {
    const { style, logo, currentUser } = this.state
    return (
      <Header className="header">
        <div className="logo">
          <Link to="/"><img src={logo.uri} alt="logo" width={logo.width} /></Link>
        </div>
        <Menu theme="" mode="horizontal" defaultSelectedKeys={['1']} style={style}>
          <Menu.Item key="1" className="dkp-system">DKP SYSTEM</Menu.Item>
        </Menu>
        {currentUser && <li className="ant-menu-item" role="menuitem" onClick={() => this.logout()}>登出</li>}
        {currentUser && <li className="ant-menu-item" role="menuitem"><Link to="/backup">备份</Link></li>}
      </Header>
    )
  }
}

export default withRouter(Navbar)
