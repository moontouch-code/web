import Vue from 'vue'
import popupTeam from '../components/common/popupTeam.vue'

const $app = Vue.extend(popupTeam)
const $popupTeam = new $app().$mount(document.createElement('div'))

document.body.appendChild($popupTeam.$el)

export default {
    install(vm) {
        vm.prototype.$popupTeam = {
            show: (params) => {
                Object.keys(params).forEach(key => {
                    $popupTeam[key] = params[key]
                })
                $popupTeam.visable = true
            },
            hide: () => {
                $popupTeam.visable = false
            }
        }
    }
}