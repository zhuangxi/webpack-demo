// import './assets/index.css'
// import './assets/index.less'

// let absss = 'a'

// console.log('call me 程序员')

// new Promise((resolve, reject) => {
//     console.log(123)
//     resolve()
// })

import Vue from 'vue'
import App from './app'

new Vue({
    render: h => h(App) 
}).$mount('#app')