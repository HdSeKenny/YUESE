import React, { Component } from 'react'
import { Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Navbar, Footer } from './layout'
import { DKP, Admin, Backup } from './pages'
import { UserService } from '../services'
import { EventClient } from '../utils'

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      currentUser
        ? <Component {...props} />
        : <Redirect to="/admin" />
    )}
  />
)

export default class App extends Component {
  constructor() {
    super()
    this.state = { currentUser: null }
  }

  componentDidMount() {
    this.getCurrentUser()
    EventClient.on('login_success', () => this.getCurrentUser())
  }

  getCurrentUser = () => {
    UserService.getCurrentUser()
      .then((data) => {
        this.setState({ currentUser: data })
      })
      .catch(() => {
        if (localStorage.getItem('id_token')) {
          localStorage.removeItem('id_token')
        }
      })
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className="app">
        <Layout>
          <Navbar currentUser={currentUser} />
          <Layout.Content>
            <Switch>
              <Route exact path="/" component={() => <DKP currentUser={currentUser} />} />
              <Route path="/admin" component={() => <Admin currentUser={currentUser} />} />
              <PrivateRoute path="/backup" component={Backup} currentUser={currentUser} />
              <Route path="*" exact component={() => <DKP currentUser={currentUser} />} />
            </Switch>
          </Layout.Content>
          <Footer />
        </Layout>
      </div>
    )
  }
}
