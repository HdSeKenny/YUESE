import React from 'react'
import { Modal, Menu, Dropdown, Button, Icon, Input, Row, Col, message } from 'antd'

class CalculateScoresForm extends React.Component {
  state = {
    addScoreOptions: [
      '周五联赛第一场',
      '周五联赛第二场',
      '周六联赛',
      '势力战',
      '宣战',
      '野外激情',
      '藏金谷激情',
      '其他'
    ],
    reduceScoreOptions: [
      '玩家拍卖扣除'
    ],

    scorelabel: '周五联赛第一场',
    scoreValue: '',
    actions: [
      { action: 'A', value: '加分' },
      { action: 'R', value: '减分' },
    ],
    currentAction: {
      action: 'A',
      value: '加分'
    },
  }

  handleMenuClick = (e) => {
    this.setState({ scorelabel: e.key }, () => {

    })
  }

  handleActionsMenuClick = (e) => {
    const { actions, addScoreOptions, reduceScoreOptions } = this.state
    const newScoreLable = e.key === '加分' ? addScoreOptions[0] : reduceScoreOptions[0]
    this.setState({ currentAction: actions.find(a => a.value === e.key), scorelabel: newScoreLable })
  }

  onScoreValueChange = (e) => {
    this.setState({ scoreValue: e.target.value })
  }

  onSubmitScoreChange = () => {
    const { currentAction, scoreValue, scorelabel } = this.state
    if (!scoreValue.trim()) {
      return message.error('请填写分数，并且分数必须是数字')
    }
    this.props.onSubmitScoreChange({
      action: currentAction,
      label: scorelabel,
      value: scoreValue,
      createdAt: new Date()
    })
  }

  render() {
    const { addScoreOptions, reduceScoreOptions, scorelabel, scoreValue, actions, currentAction } = this.state
    const { changeVisible, hideChangeModal, confirmLoading, batchPlayersNameString } = this.props
    const addScoreMenu = (
      <Menu onClick={e => this.handleMenuClick(e)}>
        {addScoreOptions.map(aso => <Menu.Item key={aso}>{aso}</Menu.Item>)}
      </Menu>
    )

    const reduceScoreMenu = (
      <Menu onClick={e => this.handleMenuClick(e)}>
        {reduceScoreOptions.map(rso => <Menu.Item key={rso}>{rso}</Menu.Item>)}
      </Menu>
    )

    const actionsMenu = (
      <Menu onClick={e => this.handleActionsMenuClick(e)}>
        {actions.map(a => <Menu.Item key={a.value}>{a.value}</Menu.Item>)}
      </Menu>
    )

    const batchPlayerTitleStyle = {
      textAlign: 'left',
      color: '#1890ff',
      fontWeight: '600',
      marginBottom: '20px'
    }

    const batchPlayerLabelStyle = {
      color: '#333',
      fontWeight: '700'
    }

    return (
      <Modal
        title="DKP批量操作"
        visible={changeVisible}
        onOk={() => this.onSubmitScoreChange()}
        onCancel={() => hideChangeModal()}
        okText="确认"
        cancelText="取消"
        confirmLoading={confirmLoading}
      >
        <div className="batch-players-title" style={batchPlayerTitleStyle}>
          <span className="lable" style={batchPlayerLabelStyle}>操作对象 : </span>
          <span className="names">{batchPlayersNameString}</span>
        </div>
        <Row style={{ marginBottom: '15px' }}>
          <Col span={5} style={{ textAlign: 'left' }}>
            <Dropdown overlay={actionsMenu}>
              <Button>{currentAction.value} <Icon type="down" /></Button>
            </Dropdown>
          </Col>

          {currentAction.action === 'A' ? (
            <Col span={9} style={{ textAlign: 'left' }}>
              <Dropdown overlay={addScoreMenu}>
                <Button className="actions-btn">{scorelabel || addScoreOptions[0]} <Icon type="down" /></Button>
              </Dropdown>
            </Col>
          ) : (
            <Col span={9} style={{ textAlign: 'left' }}>
              <Dropdown overlay={reduceScoreMenu}>
                <Button className="actions-btn">{scorelabel || reduceScoreOptions[0]} <Icon type="down" /></Button>
              </Dropdown>
            </Col>
          )}

          <Col span={10} style={{ textAlign: 'left' }}>
            <Input type="number" value={scoreValue} onChange={e => this.onScoreValueChange(e)} />
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default CalculateScoresForm
