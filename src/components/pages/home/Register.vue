<template>
    <div>
        <Header></Header>
        <el-container class="container">
            <div class="reg-main tb-center">
                <h2 style="margin-top: 0;">用户注册</h2>
                <!-- <el-form ref="form" :model="form" label-width="auto" style="width: 350px;">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入密码" prop="repassword">
                        <el-input type="password" v-model="form.repassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">注册</el-button>
                    </el-form-item>
                </el-form> -->
                <form style="width: 350px;display: flex;flex-direction: column;">
                    <div class="reg-item">
                        <div>用户名</div>
                        <el-input v-model="form.username"></el-input>
                    </div>
                    <div class="reg-item">
                        <div>密码</div>
                        <el-input v-model="form.password" type="password"></el-input>
                    </div>
                    <div class="reg-item">                        
                        <div>再次输入密码</div>
                        <el-input v-model="form.repassword" type="password"></el-input>
                    </div>
                    <el-button color="#ff2e4d" type="primary" @click="onSubmit" style="margin-top: 20px;height: 35px;">注册</el-button>
                </form>
            </div>
        </el-container>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import Header from '../../tools/Header.vue'
import { ElMessage } from 'element-plus'

const form = reactive({
    username: '',
    password: '',
    repassword: ''
})
const onSubmit = () => {
    if (form.password !== form.repassword) {
        ElMessage({
            message: '两次输入密码不一致',
            type: 'error'
        })
        return
    }else if(form.username === '' || form.password === '' || form.repassword === ''){
        ElMessage({
            message: '用户名或密码不能为空',
            type: 'error'
        })
        return
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    z-index: 1;
    height: calc(100vh - 60px);
    background: #d8d8d8;
}

.reg-main {
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    background: #fff;
    height: 400px;
    width: 600px;
    justify-content: center;
}
.reg-item{
    margin-top: 10px;
}
</style>