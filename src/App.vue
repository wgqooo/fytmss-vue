<template>
	<el-config-provider :locale="zhCn">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
//ElementPlus 提供了全局配置国际化的设置
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useThemeStore } from './store/theme';

const theme = useThemeStore();
theme.initTheme();
</script>

<style>
@import './assets/css/main.css';
</style>
