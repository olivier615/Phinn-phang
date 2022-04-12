import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
import { required, email, min, max, numeric } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import CKEditor from '@ckeditor/ckeditor5-vue'
import $httpMessageState from '@/libs/PushMassage'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('numeric', numeric)

configure({
  generateMessage: localize({ zh_TW: zhTW })
})
setLocale('zh_TW')

const app = createApp(App)
app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(router)
app.use(VueAxios, axios)
app.use(CKEditor)
// app.component('Loading', Loading) // eslint-disable-line
app.component('FormTemp', Form)
app.component('FieldTemp', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
