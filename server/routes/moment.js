const momentController = require('../controller/momentController')

module.exports = [
  {
    method: 'get',
    path: '/list',
    handler: momentController.listMoment,
    meta: {
      token: true
    }
  },
  {
    method: 'post',
    path: '/create',
    handler: momentController.addMoment,
    meta: {
      token: true
    }
  },
  {
    method: 'post',
    path: '/like',
    handler: momentController.likeMoment,
    meta: {
      token: true
    }
  }
]
