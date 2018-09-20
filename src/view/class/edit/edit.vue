
<template>
    <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="图片选择">
                <vueOssUploader :path="path" :debug="true" :name-mode="nameMode" :keySet="keySet" :name="name" v-on:success="uploaded" @error="showError"></vueOssUploader>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
    name: 'Edit',
    data() {
        return {
            dialogVisible: false, // 对话框显示隐藏
            // 图片
            path: 'shoe/',
            name: 'img1',
            nameMode: 1,
            errorShow: false,
            errorMsg: '',
            form: {
                url: '',
                id: '',
                status: '',
                title: ''
            },
            keySet: this.$store.state.keySet,
            filename: '',
            id: 'uploadImage',
        }
    },
    methods: {
        show(index, row) {
            this.dialogVisible = true;
            this.form.id = row.id
            this.form.title = row.title
            this.form.status = row.status
            console.log(index)
            console.log(row)
        },
        submit() {
            console.log(111)
            this.$api.post('/first-class/edit', this.form, response => {
                console.log(response)
                if (response.status == 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.$emit('getList');
                    this.dialogVisible = false;
                }
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        uploaded (filename) {
            this.filename = 'https://' + this.keySet.bucket + '.oss-cn-' + this.keySet.region + '.aliyuncs.com/' + filename
            console.log(this.filename)
            this.form.url = this.filename
        },
        showError (e) {
            this.errorShow = true
            console.log(e)
            this.errorMsg = e.msg || JSON.stringify(e)
        },
    }
}
</script>
