export default {
  makeDKPColumns: sortedInfo => [
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
      title: '总历史',
      dataIndex: 'history_total_dkp',
      key: 'history_total_dkp',
      // width: '15%',
      align: 'center',
      className: 'header',
      editable: false,
      sorter: (a, b) => a.history_total_dkp - b.history_total_dkp,
      sortOrder: sortedInfo.columnKey === 'history_total_dkp' && sortedInfo.order
    },
    {
      title: '剩余',
      dataIndex: 'left_total_dkp',
      key: 'left_total_dkp',
      // width: '15%',
      align: 'center',
      className: 'header',
      editable: false,
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
  ],
  batchActions: {
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
  },
  table: {
    defaultPageSize: 25
  }
}
