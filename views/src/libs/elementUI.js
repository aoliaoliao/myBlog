import Vue from 'vue'
import 'mint-ui/lib/style.css'

import {
  Cell,
  Navbar,
  Button,
  Swipe,
  SwipeItem,
  TabContainer,
  TabContainerItem,
  Loadmore,
  Field,
  Toast,
  Switch,
  Badge,
  Tabbar,
  TabItem
} from 'mint-ui'

Vue.component( Cell.name, Cell )
Vue.component( Navbar.name, Navbar )
Vue.component( TabContainer.name, TabContainer )
Vue.component( TabContainerItem.name, TabContainerItem )
Vue.component( Loadmore.name, Loadmore )
Vue.component( Button.name, Button )
Vue.component( Swipe.name, Swipe )
Vue.component( SwipeItem.name, SwipeItem )
Vue.component( Field.name, Field )
Vue.component( Switch.name, Switch )
Vue.component( Badge.name, Badge )
Vue.component( Tabbar.name, Tabbar )
Vue.component( TabItem.name, TabItem )
Vue.prototype.$toast = Toast
