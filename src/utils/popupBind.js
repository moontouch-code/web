import Vue from 'vue'
import popupBind from '../components/common/popupBind.vue'

const $app = Vue.extend(popupBind)
const $popupBind = new $app().$mount(document.createElement('div'))

document.body.appendChild($popupBind.$el)

export default {
    install(vm) {
        vm.prototype.$popupBind = {
            show: (params) => {
                Object.keys(params).forEach(key => {
                    $popupBind[key] = params[key]
                })
                $popupBind.visable = true
            },
            hide: () => {
                $popupBind.visable = false
            }
        }
    }
}