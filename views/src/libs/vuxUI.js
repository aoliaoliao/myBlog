import Vue from 'vue'
import Icon from '@/components/Icon'

import {
  Group,
  Cell,
  XInput,
  XTextarea,
  XSwitch,
  XButton,
  Flexbox,
  FlexboxItem,
  ViewBox,
  Tabbar,
  TabbarItem,
  Previewer
} from 'vux'

Vue.component( 'vux-group', Group )
Vue.component( 'vux-cell', Cell )
Vue.component( 'vux-input', XInput )
Vue.component( 'vux-textarea', XTextarea )
Vue.component( 'vux-switch', XSwitch )
Vue.component( 'vux-button', XButton )
Vue.component( 'vux-flexbox', Flexbox )
Vue.component( 'vux-flexboxitem', FlexboxItem )
Vue.component( 'vux-viewbox', ViewBox )
Vue.component( 'vux-tabbar', Tabbar )
Vue.component( 'vux-tabbaritem', TabbarItem )
Vue.component( 'vux-previewer', Previewer )

Vue.component( 'b-icon', Icon )