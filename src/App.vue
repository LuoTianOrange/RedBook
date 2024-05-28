<script>
import { RouterView } from 'vue-router';
import { KeepAlive } from 'vue';
import Main from './components/pages/home/Main.vue'

export default {
  name: 'App',
    components: {
        Main,RouterView,KeepAlive
    }
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
