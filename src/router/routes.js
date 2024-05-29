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
                path: 'notice',
                name: 'Notice',
                title: '通知',
                component: () => import('../components/pages/home/Notice.vue'),
                redirect: '/notice/comments',
                children:[
                    {
                        path: 'comments',
                        name: 'Comments',
                        title: '评论和@',
                        component: () => import('../components/pages/home/Comments.vue'),
                    },
                    {
                        path: 'collections',
                        name: 'Collections',
                        title: '点赞和收藏',
                        component: () => import('../components/pages/home/Collections.vue'),
                    }
                ]
            },
            {
                path: 'myinfo',
                name: 'MyInfo',
                title: '我的',
                component: () => import('../components/pages/home/MyInfo.vue'),
            }
        ]
    },

]
export default routes
