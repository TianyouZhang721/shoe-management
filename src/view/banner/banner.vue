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
                    @click.native.prevent="changeStatus(scope.$index, scope.row)"
                    size="mini"
                    type="primary">
                    {{scope.row.status == '1' ? '上架' : '下架'}}
                    </el-button>
                    <el-button
                    @click.native.prevent="edit(scope.$index, scope.row)"
                    size="mini"
                    type="primary">
                    编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑 -->
        <Edit ref="edit" @getList="getBanner"></Edit>
        <Create ref="create" @getList="getBanner"></Create>
        <!-- 新建 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total="bannerTotal"
            :page-size="limit"
            @current-change="currentChange">
        </el-pagination>
        <div class="bottom">
            <el-button type="primary" @click="createBanner">添加</el-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
// import Api from './../../api/index.js'
import Vue from 'vue'
// Vue.prototype.$api = Api
import Edit from './edit/edit.vue'
import Create from './create/create.vue'
export default {
    name: 'Banner',
    data() {
        return {
            bannerList: [],
            bannerTotal: 0, // banner总数
            limit: 5,
            skip: 0,
            options: [
                {value: '1', label: '下架'},
                {value: '0', label: '上架'}
            ],
            dialogVisible: false, // 对话框显示隐藏
            form: {
                url: '',
                createTime: '',
                status: '',
                jump: ''
            },
            show: false,
            region: 'beijing',// 根据你买的那个区的做相应的更改
            bucket: 'shoemanagement721',
            id: 'uploadImage',
            url: '',
        }
    },
    filters: {
        getStatus: function(status) {
            return status == '1' ? '下架' : '上架'
        }
    },
    components: {
        Edit,
        Create
    },
    methods: {
        // 获取banner总数
        getBannerCount() {
            this.$api.get('banner/countBanner', {}, response => {
                console.log(response)
                this.bannerTotal = response.data[0].count
            })
        },
        // 获取banner列表
        getBanner() {
            this.$api.get('banner/getBanner?limit=' + this.limit + '&skip=' + this.skip, {}, response => {
                console.log(response)
                this.bannerList = response.data;
            })
            this.getBannerCount()
        },
        // 调起编辑弹框
        edit(index, row) {
            this.$refs.edit.show(index, row)
        },
        // 调起新建弹框
        createBanner() {
            this.$refs.create.show()
        },
        // 点击页码
        currentChange(val) {
            this.skip = this.limit * (val - 1)
            this.getBanner()
        },
        // 上下架操作
        changeStatus(index, row) {
            let status = row.status == '1' ? '0' : '1'
            this.$api.post('banner/edit', {url: row.url, status: status, jump: row.jump, id: row.id}, response => {
                console.log(response)
                if (response.data.code == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.getBanner()
                }
            })
        }
    },
    mounted() {
        this.getBanner();
        this.getBannerCount();
        console.log(this.$store.state)
    }
}
</script>


