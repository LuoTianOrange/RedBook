const routes = [
    {
        path: '/',
        name: 'Main',
        title: '首页',
        component: () => import('../components/pages/userpages/Main.vue'),
    },
    {
        path: '/test',
        name: 'Test',
        title: '首页',
        component: () => import('../components/pages/userpages/Test.vue'),
    }
]
export default routes
