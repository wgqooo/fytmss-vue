<template>
    <div class="wrapper">
        <v-header />
        <v-sidebar />
        <!--:class 是Vue.js中的动态绑定类的语法，它根据 sidebar.collapse 的值动态地添加或移除 
            content-collapse 类。这通常用于控制CSS样式，以便根据应用程序的状态切换元素的样式-->
        <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
            <v-tabs></v-tabs>
            <div class="content">
                <!--<router-view> 是Vue Router提供的一个用于渲染匹配当前路由的组件的组件。v-slot 是Vue.js中的插槽语法，
                    它允许父组件向子组件传递内容。在这里，通过 v-slot，子组件可以访问父组件传递的数据。
                    { Component } 是解构赋值语法，它从插槽中获取名为 Component 的变量，该变量代表当前匹配的路由组件。-->
                <router-view v-slot="{ Component }">
                    <!--这是Vue.js中的过渡动画组件，用于在组件之间切换时添加动画效果。name 属性指定了过渡效果的名称，
                        这里是 "move"。mode 属性设置了过渡模式，这里是 "out-in"，表示在旧元素离开之后，新元素进入-->
                    <transition name="move" mode="out-in">
                        <!--这是Vue.js中的动态组件，它根据 Component 变量的值动态地渲染不同的组件。:is 属性指定了要渲染的组件名称，
                            这里使用了动态绑定，将 Component 变量的值作为组件名称-->
                        <keep-alive :include="tabs.nameList">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar';
import { useTabsStore } from '@/store/tabs';
import vHeader from '@/components/header.vue';
import vSidebar from '@/components/sidebar.vue';
import vTabs from '@/components/tabs.vue';

const sidebar = useSidebarStore();
const tabs = useTabsStore();
</script>

<style>
.wrapper {
    height: 100vh;
    overflow: hidden;
}
.content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    background: #eef0fc;
    overflow: hidden;
}

.content {
    width: auto;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    box-sizing: border-box;
}

.content::-webkit-scrollbar {
    width: 0;
}

.content-collapse {
    left: 65px;
}
</style>
