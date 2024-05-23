const routes = [
    {
        path: '/',
        name: 'Main',
        title: '首页',
        component: () => import('@/component/pages/userpages/Main.vue'), //.vue不能省略
    }
]
export default routes
