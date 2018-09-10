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
        <el-dialog
            title="修改"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="图片选择">
                    <a class="btn" @click="toggleShow">设置头像</a>
                    <my-upload field="img"
                        @imagechanged="change"
                        @crop-success="cropSuccess"
                        @crop-upload-success="cropUploadSuccess"
                        @crop-upload-fail="cropUploadFail"
                        v-model="show"
                        :width="240"
                        :height="120"
                        url="http://47.93.51.252/upload/alioss/getOssToken"
                        :headers="headers"
                        :id="id"
                        img-format="png"></my-upload>
                </el-form-item>
                <el-form-item label="跳转链接">
                    <el-input v-model="form.jump"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
Vue.prototype.$api = Api
import myUpload from 'vue-image-crop-upload'
export default {
    name: 'Banner',
    data() {
        return {
            bannerList: [],
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
            id: 'upload',
            show: false,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
            region: 'oss-cn-beijing',// 根据你买的那个区的做相应的更改
            bucket: 'shoemanagement721',
        }
    },
    filters: {
        getStatus: function(status) {
            return status == '1' ? '下架' : '上架'
        }
    },
    components: {
        'my-upload': myUpload
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
        },
        edit(index, row) {
            this.dialogVisible = true;
            this.form.url = row.url;
            this.form.jump = row.jump;
        },
        // 关闭弹框前的回调函数，延缓关闭对话框
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        onSubmit() {
            console.log('submit!');
        },
        toggleShow() {
            this.show = !this.show;
        },
        change(fileName, fileType, fileSize) {
            console.log(fileName, fileType, fileSize)
            // console.log(111)
            // const _this = this;
            // const urls = [];
            // _this.$api.get('/upload/alioss/getOssToken', {}, response => {
            //     console.log(response)
            // })
        },
        /**
            * crop success
            *
            * [param] imgDataUrl
            * [param] field
            */
        cropSuccess(imgDataUrl, field){
            this.imgDataUrl = imgDataUrl;
            console.log(111)
            // const _this = this;
            // const urls = [];
            // _this.$api.get('/upload/alioss/getOssToken', {}, response => {
            //     console.log(response)
            // })
        },
        /**
            * upload success
            *
            * [param] jsonData   服务器返回数据，已进行json转码
            * [param] field
            */
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        /**
            * upload fail
            *
            * [param] status    server api return error status, like 500
            * [param] field
            */
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        }
    },
    mounted() {
        this.getBanner();
    }
}
</script>


