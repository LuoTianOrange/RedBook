<template>
    <div>
        <div class="main-container">
            <!--头部导航栏-->
            <Header></Header>
            <el-container style="height: calc(100vh - 60px);">
                <!--左侧菜单-->
                <el-container>
                    <el-aside width="240px" class="menu">
                        <!-- <div
                        style="height: 60px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
                        <img style="width: 80px;margin-left: 30px;" src="/images/小红书logo.png" />
                    </div> -->
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
                        <div class="menu-item-login" v-show="!isLoggedIn" @click="LoginVisible = true">
                            <div class="menu-item-box" style="margin: 0 auto;">
                                <div>登录</div>
                            </div>
                        </div>
                        <div style="margin-top: auto;"></div>
                        <el-dropdown class="menu-item">
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                            <div class="menu-item-box">
                                <el-icon style="margin-right: 15px;">
                                    <MoreFilled />
                                </el-icon>
                                <div>更多</div>
                            </div>
                        </el-dropdown>
                    </el-aside>
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
                                <el-input class="input" v-model="account" autocomplete="off" placeholder="输入账号"
                                    @blur="validateForm" />
                                <template slot="append">
                                    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
                                </template>

                                <el-input class="input" v-model="password" autocomplete="off"
                                    placeholder="输入密码"></el-input>
                                <div class="login-btn">
                                    <div class="menu-item-box" style="margin: 0 auto;">
                                        <div @click="login">登录</div>
                                    </div>
                                </div>
                                <div class="rl-center login-pwd">
                                    <div>忘记密码</div>
                                    <router-link :to="{ name: 'Register' }"
                                        style="margin-left: 20px;">注册账号</router-link>
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
import { computed, ref, reactive, onUnmounted } from 'vue'
import { Search, House } from '@element-plus/icons-vue'
import Header from '../../tools/Header.vue'
import axios from 'axios'
import { userIdStore } from '../../../stores/user';

let info = ref(null)
let imgsrc = new URL(`../../assets/images/${name}.png`, import.meta.url).href
const searchbox = ref('');
const account = ref('');
const password = ref('');
const errorMessage = ref('');
const userStore = userIdStore();



const login = async () => {
    try {
        const response = await axios.get(`/api/user/login`, {
            params: {
                username: account.value,
                password: password.value,
            },
        });
        if (response.data.msg == null) {
            LoginVisible.value = false
            isLoggedIn.value = true
            console.log(isLoggedIn.value)
            userStore.setUserData(response.data.data); // 更新全局状态中的用户id   
        } else {
            // 登录失败处理逻辑  
            alert('账号或密码错误！');
        }
    } catch (error) {
        // 捕获API请求中的错误  
        console.error('登录时发生错误:', error);
        alert('登录失败，请重试！');
    }
};

function logout(){ 
      localStorage.removeItem('user');  
}
// const checkLoginStatus = () => {  
//       const id = localStorage.getItem('user');  
//       if (id) {  
//         isLoggedIn.value = true; 

//         // 在这里你可以执行其他登录后的初始化操作，如从服务器获取用户信息等  
//       }  
//     };  


// onmounted(checkLoginStatus); // 在组件挂载时检查登录状态

// const validateForm = () => {  
//       if (!account.value) {  
//         errorMessage.value = '账号不能为空';  
//         alert(账号不能为空)
//         console.log('账号不能为空')
//       } else {  
//         // 清除错误信息  
//         errorMessage.value = '';  
//       }  
//       // 其他验证逻辑...  
//     };  


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

const isLoggedIn = ref(false)

//检查是否弹窗
const CheckLogin = (item) => {
    if (item.loginRequired) {
        LoginVisible.value = true
    }
}
</script>

<style scoped>
.error-message {
    color: red;
    /* 其他样式 */
}

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
    margin-right: 30px;
}

/* @media screen and (max-width: 950px) {
    .header-logo-small {
        display: flex;
        margin-right: 30px;
    }

}

@media screen and (min-width: 950px) {
    .header-logo-small {
        display: none;
    }

} */

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

:deep(.el-dialog) {
    max-width: 700px !important;
    min-width: 500px !important;
}
</style>