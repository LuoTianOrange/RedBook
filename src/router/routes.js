import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Main',
        title: '首页',
        component: () => import('../components/pages/home/Main.vue'),
        redirect: '/home',
        children: [
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
                children: [
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
                    },
                    {
                        path: 'follows',
                        name: 'Follows',
                        title: '新增关注',
                        component: () => import('../components/pages/home/Follows.vue'),
                    }
                ]
            },
            {
                path: 'myinfo',
                name: 'MyInfo',
                title: '我的',
                component: () => import('../components/pages/home/MyInfo.vue'),
                // meta: { requiresAuth: true },
            },
            {
                path: 'note/:id',
                name: 'Note',
                title: '笔记详情',
                component: () => import('../components/pages/explore/Note.vue'),
                props: true,
            },
        ]
    },
    {
        path: '/publish',
        name: 'Publish',
        title: '发布',
        component: () => import('../components/pages/publish/Publish.vue'),
        // meta: { requiresAuth: true },
        redirect: '/publish/creator',
        children: [
            {
                path: 'creator',
                name: 'Creator',
                title: '创作',
                component: () => import('../components/pages/publish/Creator.vue'),
            },
            {
                path: 'manage',
                name: 'Manage',
                title: '管理笔记',
                component: () => import('../components/pages/publish/Manage.vue'),
            }
        ]
    },
    {
        path: '/register',
        name: 'Register',
        title: '注册',
        component: () => import('../components/pages/home/Register.vue'),
    }

]
export default routes
