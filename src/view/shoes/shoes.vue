<template>
    <div class="shoes">
        <el-table
            :data="shoeList"
            stripe
            style="width: 100%">
            <el-table-column
                prop="id"
                label="id"
                width="80">
            </el-table-column>
            <el-table-column
                prop="url"
                label="图片"
                width="150">
                <template slot-scope="scope">
                    <img style="width: 200px" :src="scope.row.url" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="150">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                width="80">
            </el-table-column>
            <el-table-column
                prop="size"
                label="尺码"
                width="150">
            </el-table-column>
            <el-table-column
                prop="pics"
                label="展示图"
                width="200">
                <template slot-scope="scope">
                    <ul>
                        <li v-for="(item, index) in scope.row.pic.split(',')" :key="index">
                            <img style="width: 100px" :src="item" alt="">
                        </li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column
                prop="buyer"
                label="已购买人数"
                width="80">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="上架时间"
                sortable
                width="140">
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
        <!-- 新建 -->        
        <Create ref="create" @getList="getShoesList"></Create>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
import Create from './create/create.vue'
export default {
    name: 'Shoes',
    components: {
        Create
    },
    data() {
        return {
            shoeList: [],
            shoeTotal: 0,
            limit: 10,
            skip: 0,
        }
    },
    methods: {
        // 上下架操作
        changeStatus(index, row) {
            console.log(row)
        },
        // 编辑
        edit(index, row) {
            console.log(row)
        },
        // 调起新建弹框
        createClass() {
            this.$refs.create.show()
        },
        // 获取商品列表
        getShoesList() {
            this.$api.get('/shoes/shoeList', {}, response => {
                console.log(response)
                this.shoeList = response.data
            })
            this.getShoesCount()
        },
        // 获取商品数量
        getShoesCount() {
            this.$api.get('/shoes/count', {}, response => {
                console.log(response)
                this.shoeTotal = response.data[0].count;
                console.log(this.shoeTotal)
            })
        }
    },
    mounted() {
        this.getShoesList()
    }
}
</script>


