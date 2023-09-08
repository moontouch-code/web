import Vue from 'vue'
import popupHome from '../components/common/popupHome.vue'

const $app = Vue.extend(popupHome)
const $popupHome = new $app().$mount(document.createElement('div'))

document.body.appendChild($popupHome.$el)

export default {
    install(vm) {
        vm.prototype.$popupHome = {
            show: (params) => {
                Object.keys(params).forEach(key => {
                    $popupHome[key] = params[key]
                })
                $popupHome.visable = true
            },
            hide: () => {
                $popupHome.visable = false
            }
        }
    }
}