import Vue from 'vue'
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Notification
} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$notify = Notification
