/* eslint
  react/prop-types: "off",
  react/destructuring-assignment: "off",
  react/no-multi-comp: "off"
*/
import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Modal, Popover, Button } from 'antd'
import moment from 'moment'
// import 'moment/locale/zh-cn'

moment.locale()

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          )
        }}
      </EditableContext.Consumer>
    )
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editingKey: '',
      selectedRowKeys: [], // Check here to configure the default column
      sortedInfo: {}
    }
  }

  convertDataToRows = data => data.map(d => ({
    key: d._id,
    name: d.name,
    history_total_dkp: d.scores.history_total_dkp,
    left_total_dkp: d.scores.left_total_dkp,
    auction_dkp: d.scores.auction_dkp,
    player_total_score: d.scores.player_total_score,
    scores_history: d.scores_history
  }))

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys }, () => {
      this.props.onSelectRows(selectedRowKeys)
    })
  }

  isEditing = record => record.key === this.state.editingKey

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  save = (form, key) => {
    form.validateFields((error, row) => {
      if (error) { return }
      const newData = [...this.props.dataSource]
      const index = newData.findIndex(item => key === item._id)
      let item;
      if (index > -1) {
        item = newData[index]
        item.name = row.name
        item.scores = {
          auction_dkp: Math.trunc(row.left_total_dkp * 0.7),
          history_total_dkp: row.history_total_dkp,
          left_total_dkp: row.left_total_dkp,
          player_total_score: row.player_total_score
        }
        newData.splice(index, 1, { ...item })
      } else {
        item = {
          name: row.name,
          scores: {
            auction_dkp: Math.trunc(row.left_total_dkp * 0.7),
            history_total_dkp: row.history_total_dkp,
            left_total_dkp: row.left_total_dkp,
            player_total_score: row.player_total_score
          }
        }
        newData.push(item)
      }
      this.setState({ editingKey: '' },
        () => this.props.saveEditRow(newData, item))
    })
  }

  edit(key) {
    this.setState({ editingKey: key })
  }

  showConfirm = (record) => {
    Modal.confirm({
      title: '确定删除吗',
      content: '一旦删除，此数据将永远丢失，请慎重操作',
      okText: '确认',
      cancelText: '取消',
      style: {
        textAlign: 'left'
      },
      onOk: () => {
        this.props.onDeleteItem(record.key)
      },
      onCancel: () => {
        console.log('cancel')
      }
    });
  }

  render() {
    const { selectedRowKeys, sortedInfo } = this.state
    const { currentUser, dataSource } = this.props
    const data = this.convertDataToRows(dataSource)
    const isAdmin = currentUser && currentUser.role === 'admin'
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    this.columns = [
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        // width: '18%',
        align: 'center',
        className: 'header name',
        editable: true,
      },
      {
        title: '历史DKP',
        dataIndex: 'history_total_dkp',
        key: 'history_total_dkp',
        // width: '15%',
        align: 'center',
        className: 'header',
        editable: true,
        sorter: (a, b) => a.history_total_dkp - b.history_total_dkp,
        sortOrder: sortedInfo.columnKey === 'history_total_dkp' && sortedInfo.order
      },
      {
        title: '剩余DKP',
        dataIndex: 'left_total_dkp',
        key: 'left_total_dkp',
        // width: '15%',
        align: 'center',
        className: 'header',
        editable: true,
        sorter: (a, b) => b.left_total_dkp - a.left_total_dkp,
        sortOrder: sortedInfo.columnKey === 'left_total_dkp' && sortedInfo.order
      },
      {
        title: '拍卖可用',
        dataIndex: 'auction_dkp',
        key: 'auction_dkp',
        // width: '15%',
        align: 'center',
        className: 'header auction_dkp',
        editable: false,
        sorter: (a, b) => b.auction_dkp - a.auction_dkp,
        sortOrder: sortedInfo.columnKey === 'auction_dkp' && sortedInfo.order
      },
      {
        title: '总评分',
        dataIndex: 'player_total_score',
        key: 'player_total_score',
        // width: '15%',
        align: 'center',
        className: 'header',
        editable: true,
        sorter: (a, b) => b.player_total_score - a.player_total_score,
        sortOrder: sortedInfo.columnKey === 'player_total_score' && sortedInfo.order
      }
    ]

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: [
            'history_total_dkp',
            'left_total_dkp',
            'auction_dkp',
            'player_total_score'
          ].includes(col.dataIndex) ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
          className: col.dataIndex
        }),
      }
    })

    columns.push({
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      className: 'header actions',
      render: (text, record) => {
        const editable = this.isEditing(record)
        const scoresHistoryContent = (
          <div className="scores-history">
            {record.scores_history.reverse().map((sh, idx) => {
              const { created_at, label, action, value } = sh
              return (
                <div className="score-row" key={idx}>
                  <p>
                    <span className="created-at">{moment(created_at).format('YYYY/MM/DD, hh:mm:ss')} :</span>
                    <span className="label">{label}</span>
                    <span className={`action ${action === '加分' ? 'add' : 'reduce'}`}>{action.substring(0, 1)}</span>
                    <span className="value">{value} 分</span>
                  </p>
                </div>
              )
            })}
          </div>
        )
        return (
          <div className="table-edit">
            {editable && isAdmin && (
              <span>
                <EditableContext.Consumer>
                  {form => (<span className="save" onClick={() => this.save(form, record.key)} style={{ marginRight: 8 }}>保存</span>)}
                </EditableContext.Consumer>
                <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}>
                  <span className="cancel">取消</span>
                </Popconfirm>
              </span>
            )}
            {!editable && isAdmin && <span className="edit" onClick={() => this.edit(record.key)}>修改</span>}
            {!editable && isAdmin && <span className="delete" onClick={() => this.showConfirm(record)}>删除</span>}
            <Popover content={scoresHistoryContent} placement="left" title="玩家历史DKP明细" trigger="hover">
              <span className="details">明细</span>
            </Popover>
          </div>
        )
      }
    })
    const _data = data.sort((a, b) => b.history_total_dkp - a.history_total_dkp);
    return (
      <Table
        rowSelection={isAdmin ? rowSelection : null}
        components={components}
        bordered
        dataSource={_data}
        columns={columns}
        onChange={this.handleChange}
        rowClassName="editable-row"
        size="middle"
        pagination={{
          defaultPageSize: 15
        }}
      />
    )
  }
}

export default EditableTable
