<template>
    <div class="sidebar">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="/banner" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">内容管理</span>
                </template>
                <!-- <span slot="title">分组一</span> -->
                <el-menu-item index="/banner">滚动广告</el-menu-item>
                <el-menu-item index="/class">首页导航</el-menu-item>
                <el-menu-item index="1-3">底部导航</el-menu-item>
                <!-- <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu> -->
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品管理</span>
                </template>
                <el-menu-item index="2-1">商品库</el-menu-item>
                <el-menu-item index="2-2">订单管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">权限管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style lang="scss" scoped>
    // .el-menu-vertical-demo:not(.el-menu--collapse) {
    //     width: 200px;
    //     min-height: 400px;
    // }
</style>
<script>
export default {
    name: 'SideBar',
    data() {
        return {
            isCollapse: true
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>



