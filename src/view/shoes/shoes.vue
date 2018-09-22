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
                        <li v-for="(item, index) in scope.row.pic" :key="index">
                            <img style="width: 300px" :src="item" alt="">
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
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
    name: 'Shoes',
    data() {
        return {
            shoeList: [],
            shoeTotal: 0,
            limit: 10,
            skip: 0,
        }
    },
    methods = {
        // 上下架操作
        changeStatus(index, row) {
            console.log(row)
        },
        edit(index, row) {
            console.log(row)
        }
    }
}
</script>


