import Vue from 'vue'
import popupPresale from '../components/common/popupPresale.vue'

const $app = Vue.extend(popupPresale)
const $popupPresale = new $app().$mount(document.createElement('div'))

document.body.appendChild($popupPresale.$el)

export default {
    install(vm) {
        vm.prototype.$popupPresale = {
            show: (params) => {
                Object.keys(params).forEach(key => {
                    $popupPresale[key] = params[key]
                })
                $popupPresale.visable = true
            },
            hide: () => {
                $popupPresale.visable = false
            }
        }
    }
}