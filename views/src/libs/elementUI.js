import Vue from 'vue'
import 'mint-ui/lib/style.css'

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

import { Cell } from 'mint-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$notify = Notification

Vue.component(Cell.name, Cell)
