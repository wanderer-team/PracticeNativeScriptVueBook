import Vue from 'nativescript-vue'
import App from '@/frames/App'
import { DropDown } from 'nativescript-drop-down/drop-down'
import { Carousel, CarouselItem } from 'nativescript-carousel'

import store from './stores/store'
import FontIcon from 'nativescript-vue-fonticon'
import DateTimePicker from 'nativescript-datetimepicker/vue'

import * as utils from '@/utils'

import '@/plugins/amplify'
import './app.scss'

Vue.prototype.$utils = utils

Vue.use(DateTimePicker)

Vue.use(FontIcon, {
  componentName: 'FIcon', // <-- Optional. Will be the name for component icon.
  debug: true, // <-- Optional. Will output the css mapping to console.
  paths: {
    mdi: './fonts/material-design-icons.css',
  }
})
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('DropDown', () => DropDown)
Vue.registerElement('Carousel', () => Carousel)
Vue.registerElement('CarouselItem', () => CarouselItem)

new Vue({
  store,
  render: h => h(App)
}).$start()
