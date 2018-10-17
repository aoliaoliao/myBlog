import Vue from 'vue'
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  FormItem,
  Notification
} from 'element-ui'

Vue.use( Row )
Vue.use( Col )
Vue.use( Button )
Vue.use( Input )
Vue.use( Form )
Vue.use( FormItem )

Vue.prototype.$notify = Notification
