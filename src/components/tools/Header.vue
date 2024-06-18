<template>
    <el-header class="header">
        <router-link class="header-logo-small" :to="{ name: 'Home' }">
            <img style="width: 80px;" src="/images/小红书logo.png" />
        </router-link>
        <div style="flex-grow: 1;"></div>
        <el-input v-model="searchbox" style="width: 500px;height: 40px;" size="large" placeholder="搜索小红书"
            :suffix-icon="Search" />
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
</template>

<script setup>
import { computed, ref} from 'vue'
import { Search } from '@element-plus/icons-vue'
const searchbox = ref('')

</script>

<style scoped>
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
</style>