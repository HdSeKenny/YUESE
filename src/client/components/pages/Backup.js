import React from 'react'
import { Button, message } from 'antd'
import { UserService } from '../../services'

export default class Backup extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  backupData = () => {
    UserService.backupPlayersData().then(() => {
      message.success('备份成功')
    }).catch(() => message.error('不知道什么情况'))
  }

  render() {
    return (
      <div className="backup">
        <Button onClick={() => this.backupData()}>备份数据</Button>
      </div>
    )
  }
}
