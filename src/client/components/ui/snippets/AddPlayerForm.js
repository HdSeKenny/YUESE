import React from 'react'
import { Form, Input, Modal } from 'antd'

class RegistrationForm extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onConfirmAddMember(values)
      }
    })
  }

  render() {
    const { form, addVisible, hideAddModal, confirmLoading } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    }

    return (
      <Modal
        title="添加成员"
        visible={addVisible}
        onOk={() => this.handleSubmit()}
        onCancel={() => hideAddModal()}
        okText="确认"
        cancelText="取消"
        confirmLoading={confirmLoading}
      >
        <Form>
          <Form.Item {...formItemLayout} label="玩家昵称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入玩家的昵称' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="历史DKP总分">
            {getFieldDecorator('history_total_dkp', {
              rules: [{ required: true, message: '请输入玩家的历史DKP' }]
            })(
              <Input type="number" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="剩余DKP">
            {getFieldDecorator('left_total_dkp', {
              rules: [{ required: true, message: '请输入玩家剩余的DKP' }],
            })(
              <Input type="number" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="玩家总评">
            {getFieldDecorator('player_total_score', {
              rules: [{ required: true, message: '请输入玩家的总评分' }],
            })(
              <Input type="number" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'add' })(RegistrationForm)
