<template>
    <div class="banner">
        <el-table
            :data="bannerList"
            stripe
            style="width: 100%">
            <el-table-column
                prop="id"
                label="id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="banner"
                label="图片"
                width="300">
                <template slot-scope="scope">
                    <img style="width: 300px" :src="scope.row.url" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, scope.row)"
                    size="mini"
                    type="danger">
                    移除
                    </el-button>
                    <el-button
                    @click.native.prevent="changeStauts(scope.$index, scope.row)"
                    size="mini"
                    type="primary">
                    {{scope.row.status == '1' ? '上架' : '下架'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
        <div class="bottom">
            <el-button type="primary">添加</el-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
import Api from './../../api/index.js'
import Vue from 'vue'
Vue.prototype.$api = Api;
export default {
    name: 'Banner',
    data() {
        return {
            bannerList: [],
            options: [
                {value: '1', label: '下架'},
                {value: '0', label: '上架'}
            ]
        }
    },
    filters: {
        getStatus: function(status) {
            return status == '1' ? '下架' : '上架'
        }
    },
    methods: {
        getBanner() {
            this.$api.get('banner/getBanner', {}, response => {
                console.log(response)
                this.bannerList = response.data;
            })
        },
        deleteRow(index, row) {
            console.log(index)
            console.log(row)
            this.$api.post('banner/insert', {url: 'https://rebo-1256481975.cos.ap-beijing.myqcloud.com/xiaochenxu/banner.png'}, response => {
                console.log(response)
            })
        }
    },
    mounted() {
        this.getBanner();
    }
}
</script>


