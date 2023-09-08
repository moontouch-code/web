import Vue from 'vue'
import popupAsh from '../components/common/popupAsh.vue'

const $app = Vue.extend(popupAsh)
const $popupAsh = new $app().$mount(document.createElement('div'))

document.body.appendChild($popupAsh.$el)

export default {
    install(vm) {
        vm.prototype.$popupAsh = {
            show: (params) => {
                Object.keys(params).forEach(key => {
                    $popupAsh[key] = params[key]
                })
                $popupAsh.visable = true
            },
            hide: () => {
                $popupAsh.visable = false
            }
        }
    }
}