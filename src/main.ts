import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import router from './router'

import quasarLang from 'quasar/lang/es'
// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

const pinia = createPinia()
import App from './App.vue'


const app = createApp(App);
app.use(router)
app.use(pinia) 
app.use(Quasar, {
    plugins: { 
    }, // import Quasar plugins and add here
    lang: quasarLang,
    
    config: {
      // dark: 'auto',
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      //notify: {...}, // default set of options for Notify Quasar plugin
      //loading: {...}, // default set of options for Loading Quasar plugin
      //loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
    
});
app.mount('#app');