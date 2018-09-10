<template>
    <div class="header">
        <div class="left">
            <h5></h5>
        </div>
        <div class="right"></div>
    </div>
</template>
<style lang="scss" scoped>
    .header {
        height: 100%;
        background-color: #666;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
        .left {
            float: left;
            h5 {
                font-size: 16px;
                color: #fff;
                line-height: 60px;
            }
        }
        .right {
            float: right;
        }
    }
</style>
<script>
export default {
    name: 'Header',
    data() {
        return {

        }
    }
}
</script>


