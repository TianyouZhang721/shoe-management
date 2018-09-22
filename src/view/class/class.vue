<template>
    <div class="first-class">
        <el-table
            :data="classList"
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
                prop="title"
                label="标题"
                width="300">
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
        <Edit ref="edit" @getList="getClassList"></Edit>
        <!-- 新建 -->        
        <Create ref="create" @getList="getClassList"></Create>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="classTotal"
            :page-size="limit"
            @current-change="currentChange">
        </el-pagination>
        <div class="bottom">
            <el-button type="primary" @click="createClass">添加</el-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
import Edit from './edit/edit.vue'
import Create from './create/create.vue'
export default {
    name: 'Class',
    components: {
        Edit,
        Create
    },
    data() {
        return {
            classList: [],
            classTotal: 0,
            limit: 10,
            skip: 0
        }
    },
    methods: {
        // 获取总数
        getClassCount() {
            this.$api.get('/first-class/countClass', {}, response => {
                console.log(response)
                this.classTotal = response.data[0].count
            })
        },
        // 获取列表
        getClassList() {
            this.$api.get('first-class/getClass?limit=' + this.limit + '&skip=' + this.skip, {}, response => {
                console.log(response)
                this.classList = response.data
            })
            this.getClassCount()
        },
        // 上下架操作
        changeStatus(index, row) {
            let status = row.status == '1' ? '0' : '1'
            this.$api.post('first-class/edit', {url: row.url, status: status, jump: row.jump, id: row.id}, response => {
                console.log(response)
                if (response.data.code == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.getBanner()
                }
            })
        },
        // 编辑
        edit(index, row) {
            this.$refs.edit.show(index, row)
        },
        // 调起新建弹框
        createClass() {
            this.$refs.create.show()
        },
        // 页码变化
        currentChange(val) {
            this.skip = this.limit * (val - 1)
            this.getBanner()
        },
    },
    mounted() {
        this.getClassList()
    }
}
</script>


