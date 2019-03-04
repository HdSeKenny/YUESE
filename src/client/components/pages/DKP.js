import React, { Component } from 'react'
import { Input, Row, Col, Button, message, Spin } from 'antd'
import { PlayerService } from '../../services'
import { AddPlayerForm, CalculateScoresForm } from '../ui/snippets'
import EditableTable from '../ui/table/EditableTable'

export default class DKP extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
      selectedRowKeys: [],
      addVisible: false,
      changeVisible: false,
      confirmLoading: false,
      players: [],
      searchedPlayers: []
    }
  }

  onSearchMember = (e) => {
    const { players } = this.state
    const searchValue = e.target.value
    const searchedPlayers = players.filter(p => p.name.includes(searchValue))
    this.setState({ searchValue, searchedPlayers })
  }

  componentDidMount() {
    PlayerService.getAllPlayers().then((data) => {
      this.setState({ players: data, searchedPlayers: data })
    }).catch(err => console.log(err))
  }

  onSelectRows = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  hideAddModal = () => {
    this.setState({ addVisible: false })
  }

  hideChangeModal = () => {
    this.setState({ changeVisible: false })
  }

  onConfirmAddMember = (values) => {
    const { players } = this.state
    this.setState({ confirmLoading: true }, () => {
      PlayerService.addPlayer(values).then((res) => {
        players.push(res.data)
        setTimeout(() => {
          this.setState({
            players,
            addVisible: false,
            confirmLoading: false,
            searchedPlayers: players
          }, () => {
            message.success('成功添加玩家')
          })
        }, 1500)
      }).catch(err => console.log(err))
    })
  }

  onSubmitScoreChange= (scoreObj) => {
    const { players, selectedRowKeys } = this.state
    PlayerService.addOrReducePlayerDKPScore({
      scoreObj,
      selectedPlayers: selectedRowKeys
    }).then(() => {
      players.forEach((p) => {
        if (selectedRowKeys.includes(p._id)) {
          if (scoreObj.action.label === 'A') {
            p.scores.history_total_dkp += parseInt(scoreObj.scoreValue, 10)
            p.scores.left_total_dkp += parseInt(scoreObj.scoreValue, 10)
          } else {
            p.scores.left_total_dkp -= parseInt(scoreObj.scoreValue, 10)
          }
          p.scores.auction_dkp = Math.trunc(p.scores.left_total_dkp * 0.7)
          p.scores_history.unshift({
            scoreLabel: scoreObj.scoreLabel,
            actionValue: scoreObj.action.value,
            scoreValue: scoreObj.scoreValue,
            createdAt: scoreObj.createdAt
          })
        }
      })

      this.setState({
        changeVisible: false,
        players,
        searchedPlayers: players
      }, () => message.success('修改成功！'))
    }).catch(err => console.log(err))
  }

  saveEditRow = (newData, newItem) => {
    this.setState({ players: newData, searchedPlayers: newData }, () => {
      PlayerService.editPlayerScoresInfo(newItem)
        .then(() => {
          message.success('保存成功')
        })
        .catch(err => console.log(err))
    })
  }

  confirmDeleteItem = (pId) => {
    const { players } = this.state
    PlayerService.deletePlayer(pId).then(() => {
      const newPlayers = players.filter(p => p._id !== pId)
      this.setState({ players: newPlayers, searchedPlayers: newPlayers }, () => {
        message.success('删除成功')
      })
    }).catch(err => console.log(err))
  }

  showAddModal = () => {
    this.setState({ addVisible: true })
  }

  showScoreChangeModal = () => {
    const { selectedRowKeys } = this.state
    if (!selectedRowKeys.length) {
      return message.warn('请先选择需要操作的玩家！')
    }
    this.setState({ changeVisible: true })
  }

  render() {
    const { searchValue, selectedRowKeys, addVisible, changeVisible, confirmLoading, searchedPlayers } = this.state
    const { currentUser } = this.props
    const batchPlayersNameString = selectedRowKeys.map((rowKey) => {
      const player = searchedPlayers.find(sp => sp._id === rowKey)
      return player ? player.name : ''
    }).join(', ')
    const isAdmin = currentUser && currentUser.role === 'admin'
    return (
      <div className="dkp">
        <Row className="search-box">
          <Col span={10}>
            <Input size="large" placeholder="搜索" value={searchValue} onChange={e => this.onSearchMember(e)} />
          </Col>

          {isAdmin && (
            <Col span={14}>
              <Button type="primary" className="add-member" onClick={() => this.showAddModal()}>添加成员</Button>
              <Button type="primary" ghost onClick={() => this.showScoreChangeModal()}>批量操作</Button>
            </Col>
          )}
        </Row>

        <AddPlayerForm
          addVisible={addVisible}
          onConfirmAddMember={values => this.onConfirmAddMember(values)}
          hideAddModal={values => this.hideAddModal(values)}
          confirmLoading={confirmLoading}
        />

        <CalculateScoresForm
          changeVisible={changeVisible}
          onSubmitScoreChange={scoreObj => this.onSubmitScoreChange(scoreObj)}
          hideChangeModal={() => this.hideChangeModal()}
          confirmLoading={confirmLoading}
          batchPlayersNameString={batchPlayersNameString}
        />
        <EditableTable
          dataSource={searchedPlayers}
          currentUser={currentUser}
          onSelectRows={rows => this.onSelectRows(rows)}
          saveEditRow={(data, newItem) => this.saveEditRow(data, newItem)}
          onDeleteItem={pId => this.confirmDeleteItem(pId)}
        />
      </div>
    )
  }
}
