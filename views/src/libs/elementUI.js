import Vue from 'vue'
import {
  Row,
  Col,
  Button,
  Input,
  Notification

} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)

Vue.prototype.$notify = Notification
