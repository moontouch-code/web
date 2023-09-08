import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '*',
        redirect: '/home'
    },    
    {
        path:'/redirectnew',
        name:'redirectnew',
        component:()=>import('../views/redirect.vue')
    },
    {
        path:'/beeEvent',
        name:'beeEvent',
        component:()=>import('../views/beeEvent.vue')
    },
    {
        path: '/',
        component: () =>
            import ('../views/index.vue'),
        children: [{
                path: 'home',
                name: 'home',
                component: () =>
                    import ('../views/home.vue')
            },
            {
                path:'activityfirst',
                name:'activityfirst',
                component:()=>
                import('../views/activityfirst.vue')
                
            },
            {
                path:'activitysecond',
                name:'activitysecond',
                component:()=>
                import('../views/activitysecond.vue')
            },
       
            // {
            //   path: 'whitepaper',
            //   name: 'whitepaper',
            //   component: () => import('../views/whitepaper.vue')
            // },
            // {
            //     path: 'presale',
            //     name: 'presale',
            //     component: () =>
            //         import ('../views/presale.vue')
            // },
            // {
            //     path: 'login',
            //     name: 'login',
            //     component: () =>
            //         import ('../views/login.vue')
            // },
            // {
            //     path: 'asset',
            //     name: 'asset',
            //     component: () =>
            //         import ('../views/Asset.vue')
            // },
            // {
            //     path: 'download',
            //     name: 'download',
            //     component: () =>
            //         import ('../views/download.vue')
            // },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router