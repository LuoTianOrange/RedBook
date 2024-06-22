# 小红书(前端部分)

本项目为仿照小红书写的笔记交流网站，仅为前端部分，用于项目实训的课程设计。

### 目录

- [如何使用](#如何使用)
  - [本地部署](#本地部署)
  
- [任务](#任务)
- [难点](#难点)
- [预览](#预览)

## 如何使用

##### 本地部署

首先，电脑上要安装最新版的npm和node环境

1. Fork 并 Clone 代码到本地
2. 进入项目目录，运行`npm install`安装项目依赖
3. 安装完成依赖后，运行`npm run dev`即可启动项目，默认在`localhost:5173`端口启动
4. 如果需要编译项目，运行`npm run build`即可编译项目，编译后会在当前目录下生成`dist`文件夹

## 任务
- [x] 笔记管理页面高度问题
- [ ] 为每个页面适配移动端
- [x] “我的”页面每个笔记的样式
- [ ] “通知”页面每个通知的样式
- [x] 添加登录路由守卫 
- [ ] 优化瀑布流组件
- [ ] 添加笔记管理子路由
- [x] 添加注册页面
- [x] 解决首页菜单选中后再返回首页没有恢复初始值的问题
- [ ] 添加一个加载时候的动画/进度条
- [ ] 适配没有数据的情况的显示

## 难点

- 笔记页面的动态路由
- 用于登录的路由守卫
- 首页瀑布流组件展览笔记
- 防止页面在发起请求前获取数据：设置一个变量，在加载数据前使用v-if该变量防止数据加载
- 评论嵌套：使用js提前将评论按照规则分组
- 解决跨域问题：在vite.config使用代理

## 预览

#### 思维导图

![思维导图](markdown/images/思维导图.png)

#### 首页

###### 发现

![首页](markdown/images/首页.png)

###### 通知

![通知](markdown/images/通知.png)

###### 我的

![我的](markdown/images/我的.png)

###### 登录

![登录](markdown/images/登录弹窗.png)

###### 页面小于950px时

首页部分

![首页_950px](markdown/images/首页_950px.png)

------

登录界面

![登录_950px](markdown/images/登录_950px.png)

#### 发布页面

##### 发布笔记

![发布页面](markdown/images/发布页面.png)

##### 管理笔记

![管理笔记](markdown/images/管理笔记.png)

![管理笔记最后一页](markdown/images/管理笔记最后一页.png)