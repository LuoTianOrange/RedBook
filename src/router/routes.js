const routes = [
    {
        path: '/',
        name: 'Main',
        title: '首页',
        component: () => import('../components/pages/home/Main.vue'),
        redirect: '/home',
        children:[
            {
                path: 'home',
                name: 'Home',
                title: '发现',
                component: () => import('../components/pages/home/Home.vue'),
            },
            {
                path: 'noitce',
                name: 'Noitce',
                title: '通知',
                component: () => import('../components/pages/home/Noitce.vue'),
            }
        ]
    },

]
export default routes
