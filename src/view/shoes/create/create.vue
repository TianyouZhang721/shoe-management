<template>
    <el-dialog
        title="新增"
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
            <el-form-item label="价格">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="尺寸">
                <el-checkbox-group v-model="form.size">
                    <el-checkbox label="35"></el-checkbox>
                    <el-checkbox label="36"></el-checkbox>
                    <el-checkbox label="37"></el-checkbox>
                    <el-checkbox label="38"></el-checkbox>
                    <el-checkbox label="39"></el-checkbox>
                    <el-checkbox label="40"></el-checkbox>
                    <el-checkbox label="41"></el-checkbox>
                    <el-checkbox label="42"></el-checkbox>
                    <el-checkbox label="43"></el-checkbox>
                    <el-checkbox label="44"></el-checkbox>
                    <el-checkbox label="45"></el-checkbox>
                    <el-checkbox label="46"></el-checkbox>
                    <el-checkbox label="47"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="展示图">
                <vueOssUploader :path="path" :debug="true" :name-mode="nameMode" :keySet="keySet" :name="name" v-on:success="uploaded" @error="showError"></vueOssUploader>
            </el-form-item>
            <el-form-item label="详情">
                <el-input v-model="form.detail"></el-input>
            </el-form-item>
            <el-form-item label="所属二级分类">
                <el-input v-model="form.classificationId"></el-input>
            </el-form-item>
            <el-form-item label="购买人数">
                <el-input v-model="form.buyer"></el-input>
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
    name: 'Create',
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
                title: '',
                price: '',
                size: [],
                pics: [],
                detail: '',
                classificationId: '',
                buyer: 0,
                id: '',
                status: ''
            },
            keySet: this.$store.state.keySet,
            filename: '',
            id: 'uploadImage',
        }
    },
    methods: {
        show() {
            this.dialogVisible = true;
            this.form.status = '1'
        },
        // 提交修改
        submit() {
            this.$api.post('/first-class/insert', this.form, response => {
                console.log(response)
                if (response.status == 200) {
                    this.$message({
                        message: '添加成功',
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
            this.form.pics.push(this.filename)
            // this.form.url = this.filename
        },
        showError (e) {
            this.errorShow = true
            console.log(e)
            this.errorMsg = e.msg || JSON.stringify(e)
        },
    }
}
</script>
