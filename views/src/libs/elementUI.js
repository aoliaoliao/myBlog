import Vue from 'vue'
import 'mint-ui/lib/style.css'

import {
  Row,
  Col,
  // Button,
  Input,
  Form,
  FormItem,
  Notification
} from 'element-ui'

import {
  Cell,
  Navbar,
  Button,
  TabItem,
  Swipe,
  SwipeItem,
  TabContainer,
  TabContainerItem,
  Loadmore,
  Field,
  Toast,
  Switch,
  Badge
} from 'mint-ui'

import TheScroll from '../components/TheScroll.vue'

Vue.use(Row)
Vue.use(Col)
// Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
// Vue.use(Tabs)
// Vue.use(TabPane)
Vue.prototype.$notify = Notification

Vue.component(Cell.name, Cell)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Field.name, Field)
Vue.component(Switch.name, Switch)
Vue.component(Badge.name, Badge)
Vue.prototype.$toast = Toast

Vue.component(TheScroll.name, TheScroll)
