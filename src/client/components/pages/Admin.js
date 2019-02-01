/* eslint
  react/prop-types: "off",
  react/destructuring-assignment: "off",
  react/no-multi-comp: "off"
*/

import React from 'react'
import { Form, Icon, Input, Checkbox, Button, Row, Col, message } from 'antd'
import { withRouter } from 'react-router-dom'

import { EventClient } from '../../utils'
import UserService from '../../services/user'

class NormalLoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      errorMessage: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values
        UserService.login(email, password).then(() => {
          message.success('登录成功！')
          EventClient.emit('login_success')
          this.props.history.push('/')
        }).catch((error) => {
          this.setState({ errorMessage: error.data.message })
        })
      }
    })
  }

  render() {
    const { errorMessage } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {errorMessage && (
          <Row>
            <p className="text-error">{errorMessage}</p>
          </Row>
        )}
        <Row className="form-title">
          <h2 className="color-6">管理员登录</h2>
        </Row>
        <Row>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' }
              ]
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
        </Row>
        <Row>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
        </Row>
        <Row>
          <Form.Item className="remember-me">
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住我</Checkbox>)}
          </Form.Item>
        </Row>
        <Row>
          <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
        </Row>
      </Form>
    )
  }
}
const NormalLogin = Form.create({ name: 'normal_login' })(NormalLoginForm)

export default withRouter(NormalLogin)
