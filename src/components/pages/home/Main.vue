<template>
    <div>
        <div class="main-container">
            <el-container style="height: 100vh;">
                <el-aside width="240px" class="menu">
                    <div
                        style="height: 60px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
                        <img style="width: 80px;margin-left: 30px;" src="/images/小红书logo.png" />
                    </div>
                    <router-link :to="{ name: 'Home' }" class="menu-item" @click="ChangeColor(1)"
                        :class="{ 'isSelect': selected === 1 }">
                        <div class="menu-item-box">
                            <el-icon style="margin-right: 15px;">
                                <House />
                            </el-icon>
                            <div>发现</div>
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'Publish' }" class="menu-item" @click="ChangeColor(2)"
                        :class="{ 'isSelect': selected === 2 }">
                        <div class="menu-item-box">
                            <el-icon style="margin-right: 15px;">
                                <Plus />
                            </el-icon>
                            <div>发布</div>
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'Notice' }" class="menu-item" @click="ChangeColor(3)"
                        :class="{ 'isSelect': selected === 3 }">
                        <div class="menu-item-box">
                            <el-icon style="margin-right: 15px;">
                                <Bell />
                            </el-icon>
                            <div>通知</div>
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'MyInfo' }" class="menu-item" @click="ChangeColor(4)"
                        :class="{ 'isSelect': selected === 4 }">
                        <div class="menu-item-box">
                            <div style="margin-right: 15px;">🦆</div>
                            <div>我</div>
                        </div>
                    </router-link>
                    <div class="menu-item-login" @click="LoginVisible = true">
                        <div class="menu-item-box" style="margin: 0 auto;">
                            <div>登录</div>
                        </div>
                    </div>
                    <div style="margin-top: auto;"></div>
                    <div class="menu-item" @click="ChangeColor(5)" :class="{ 'isSelect': selected === 5 }">
                        <div class="menu-item-box">
                            <el-icon style="margin-right: 15px;">
                                <MoreFilled />
                            </el-icon>
                            <div>更多</div>
                        </div>
                    </div>
                </el-aside>
                <el-container>
                    <!--头部导航栏-->
                    <el-header class="header">
                        <div class="header-logo-small">
                            <img style="width: 80px;" src="/images/小红书logo.png" />
                        </div>
                        <div style="flex-grow: 1;"></div>
                        <el-input v-model="searchbox" style="width: 500px;height: 40px;" size="large"
                            placeholder="搜索小红书" :suffix-icon="Search" />
                        <div style="flex-grow: 1;"></div>
                        <el-menu mode="horizontal" class="el-menu-demo" style="width: 320px;">
                            <el-sub-menu index="1">
                                <template #title>创作中心</template>
                                <el-menu-item index="1-1">创作服务</el-menu-item>
                                <el-menu-item index="1-2">直播管理</el-menu-item>
                            </el-sub-menu>
                            <el-sub-menu index="2">
                                <template #title>业务合作</template>
                                <el-menu-item index="2-1">
                                    业务合作
                                </el-menu-item>
                                <el-menu-item index="2-2">
                                    专业号
                                </el-menu-item>
                                <el-menu-item index="2-3">
                                    推广合作
                                </el-menu-item>
                                <el-menu-item index="2-4">
                                    蒲公英
                                </el-menu-item>
                                <el-menu-item index="2-5">
                                    商家入驻
                                </el-menu-item>
                                <el-menu-item index="2-6">
                                    MCN入驻
                                </el-menu-item>

                            </el-sub-menu>
                        </el-menu>
                    </el-header>
                    <router-view></router-view>
                </el-container>

                <!--登录界面-->
                <el-dialog v-model="LoginVisible">
                    <div class="el-login">
                        <div style="flex: 1;" class="tb-center el-login-left">
                            <img src="/images/小红书logo.png" style="max-width: 80px;" />
                            <div class="qrcode-box-border">
                                <div class="qrcode-box">
                                    <img src="/images/QRCode.png" />
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1;" class="tb-center el-login-right">
                            <div>账号登录</div>
                            <div class="login-input-box">
                                <el-input class="input" autocomplete="off" placeholder="输入账号"></el-input>
                                <el-input class="input" autocomplete="off" placeholder="输入密码"></el-input>
                                <div class="login-btn">
                                    <div class="menu-item-box" style="margin: 0 auto;">
                                        <div>登录</div>
                                    </div>
                                </div>
                                <div class="rl-center login-pwd">
                                    <div>忘记密码</div>
                                    <div style="margin-left: 20px;">注册账号</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-dialog>
            </el-container>

            <!--底部菜单-->
            <div class="menu-bottom">
                <router-link :to="{ name: i.router }" v-for="i in MenuBottom" :key="i.id" class="menu-bottom-item"
                    @click="CheckLogin(i)">
                    <el-icon :size="20" color="#606266" class="menu-bottom-icon">
                        <component :is="i.icon" />
                    </el-icon>
                    <div class="menu-bottom-text">
                        {{ i.name }}
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { Search, House } from '@element-plus/icons-vue'

let imgsrc = new URL(`../../assets/images/${name}.png`, import.meta.url).href
const searchbox = ref('')

//菜单点中时变背景色
const selected = ref(1)
const ChangeColor = (index) => {
    selected.value = index
}
//底部导航栏按钮设置
const MenuBottom = [
    {
        "id": 1,
        "name": "发现",
        "icon": "House",
        "loginRequired": false,
        "router": "Home"
    },
    {
        "id": 2,
        "name": "发布",
        "icon": "Plus",
        "loginRequired": true,
        "router": "Publish"
    },
    {
        "id": 3,
        "name": "通知",
        "icon": "Bell",
        "loginRequired": true,
        "router": "Notice"
    },
    {
        "id": 4,
        "name": "我",
        "icon": "User",
        "loginRequired": true,
        "router": "MyInfo"
    }
]
//初始化登录弹窗
const LoginVisible = ref(false)
//检查是否弹窗
const CheckLogin = (item) => {
    if (item.loginRequired) {
        console.log(item.loginRequired);
        LoginVisible.value = true

    }
}
</script>

<style scoped>
/*滚动条隐藏*/
::-webkit-scrollbar {
    display: none;
}

/*Main*/
.el-main-css {
    max-width: 1728px;
    min-width: 320px;
    margin: 0 auto;
}

.main-container {
    min-height: 100vh;
}

/* 菜单*/
/*屏幕大小检测*/
@media screen and (max-width: 950px) {
    .menu {
        display: none;
    }
}

@media screen and (min-width: 950px) {
    .menu {
        display: flex;
    }
}

.menu {
    flex-direction: column;
    z-index: 1;
}

.menu-item {
    display: flex;
    align-items: center;
    margin: 5px 10px 5px 10px;
    padding: 4px 0;
    cursor: pointer;
    height: 35px;
    border-radius: 20px;
    font-weight: bolder;
}

.menu-item:hover {
    background-color: #f0f0f0;

}

.menu-item-login {
    display: flex;
    align-items: center;
    margin: 5px 10px 5px 10px;
    padding: 4px 0;
    cursor: pointer;
    height: 35px;
    border-radius: 20px;
    font-weight: bolder;
    background-color: #ff2e4d;
    color: #fff;
    text-align: center;
}

.isSelect {
    background-color: #f0f0f0;
}

.menu-item-box {
    padding: 0 20px;
    display: flex;
    align-items: center;
}

/*搜索框input */
.el-input__wrapper {
    --cat-input: 20px;
    border-radius: var(--cat-input, 20px) !important;
    background-color: #f7f7f7 !important;
    color: #333 !important;
    font-size: 15px !important;
    box-shadow: none !important;
}

/*header*/
.header {
    display: flex;
    align-items: center;
    background: #fff;
    /* border-bottom: 1px solid var(--el-menu-border-color); */
}

.el-menu--horizontal.el-menu {
    border-bottom: none !important;
    ;
}

.header-left {
    display: flex;
    align-items: center;
}

.header-left-item {
    margin: 0 15px;
}

.el-menu--horizontal {
    flex-direction: row-reverse !important;
}

.header-logo-small {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

@media screen and (max-width: 950px) {
    .header-logo-small {
        display: flex;
        margin-right: 30px;
    }

}

@media screen and (min-width: 950px) {
    .header-logo-small {
        display: none;
    }

}

/* 登录界面 */
:v-deep(.el-dialog) {
    max-width: 700px !important;
    border-radius: 20px;
}

@media screen and (min-width: 950px) {
    :v-deep(.el-dialog) {
        min-width: 700px !important;
        border-radius: 20px;
    }


}

@media screen and (max-width: 950px) {
    :v-deep(.el-dialog) {
        min-width: 320px !important;
        border-radius: 20px;
    }

    .el-login-left {
        display: none;
    }

}

.el-login {
    height: 400px;
    width: 100%;
    border-radius: 20px;
    text-align: center;
    font-size: 20px;
    display: flex;
}

.el-login-left {
    border-right: 1px solid #f0f0f0;
    padding: 20px;
}

.el-login-right {
    padding: 20px;
}

.qrcode-box {
    width: 120px;
    height: 120px;
    padding: 10px;
    border-radius: 12px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.qrcode-box img {
    width: 100%;
    height: 100%;
}

.qrcode-box-border {
    border: 25px solid rgb(252, 252, 252);
    border-radius: 40px;
    margin-top: 50px;
}

.input {
    max-width: 260px;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    margin-top: 12px;
    font-size: 16px;
    /* margin-left: 30px; */
}

.login-input-box {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.login-btn {
    display: flex;
    align-items: center;
    margin-top: 40px;
    padding: 4px 0;
    cursor: pointer;
    height: 35px;
    border-radius: 20px;
    font-weight: bolder;
    background-color: #ff2e4d;
    color: #fff;
    text-align: center;
    font-size: 16px;
    width: 80%;
}

.login-pwd {
    font-size: 14px;
    margin-top: 50px;
    cursor: pointer;
}

/* 底部菜单 */
.menu-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 45px;
    background: #fff;
    flex-direction: row;
    align-items: center;
}

@media screen and (max-width: 950px) {
    .menu-bottom {
        display: flex;
    }
}

@media screen and (min-width: 950px) {
    .menu-bottom {
        display: none;
    }
}

.menu-bottom-item {
    flex: 1;
    display: flex;
    justify-content: center;
    cursor: pointer;
}

.menu-bottom-icon {
    margin-right: 10px;
}

.menu-bottom-text {
    font-size: 14px;
    color: #909399;
}
</style>