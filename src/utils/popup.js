import Vue from 'vue'
import popup from  '../components/common/popup.vue'

const $app = Vue.extend(popup)
const $popup = new $app().$mount(document.createElement('div'))
document.body.appendChild($popup.$el)
export default {
    install(vm) {
        vm.prototype.$popup = {
            show: (params) => {
                Object.keys(params).forEach(key => {
                    $popup[key] = params[key]
                })
                $popup.visable = true
            },
            hide: () => {
                $popup.visable = false
            }
        }
    }
}