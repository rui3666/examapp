<template>
    <div class="about">
        <head-top></head-top>
        <h1>资讯管理模块</h1>
<!--
        <el-button type="primary" @click=cClick>新增一条数据</el-button>
        <router-view/>
        <div class="el-table-size">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    :show-overflow-tooltip="true"
                    class="el-calendar-table">
                <el-table-column
                        prop="id"
                        label="资讯编号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="wzHeader"
                        label="文章标题"
                        width="120">
                    <!--                <template v-slot="scope">-->
                    <!--                    <el-input v-model="scope.row.wzHeader" disabled/>-->
                    <!--                </template>-->
                </el-table-column>
                <el-table-column
                        prop="wzNeiron"
                        show-overflow-tooltip
                        label="文章内容"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="beizhu"
                        label="备注"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="修改日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <el-button @click="uClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="rClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="新增" :visible.sync="CdialogFormVisible">
                <el-form :model="Cform">
                    <el-form-item label="文章标题" :label-width="formLabelWidth">
                        <el-input v-model="Cform.wzHeader" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="文章内容" :label-width="formLabelWidth">
                        <el-input v-model="Cform.wzNeiron" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="CdialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="cformClick(Cform)">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="编辑" :visible.sync="UdialogFormVisible">
                <el-form :model="Uform">
                    <el-form-item label="文章标题" :label-width="formLabelWidth">
                        <el-input v-model="Uform.wzHeader" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="文章内容" :label-width="formLabelWidth">
                        <el-input v-model="Uform.wzNeiron" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="UdialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="uformClick(Uform)">确 定</el-button>
                </div>
            </el-dialog>
            <div>
<!--                    <span class="demonstration">大于 7 页时的效果</span>-->
                    <el-pagination
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :total=this.total>
                    </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import HeadTop from "@/components/headTop";
    export default {
        components: {HeadTop},
        created() {
            this.getListCom(1, 10)
        },
        methods: {
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.val = val;
                this.getListCom(val, 10)
            },
            rClick(row) {
                console.log(row);
                var token = localStorage.getItem('token');
                this.$http.delete('http://127.0.0.1:9001/birthdaydemo/WenZhang/wenZhang/' + row.id, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).then(({data: res}) => {
                }).catch(() => {
                })
                this.getListCom(this.val, 10)
                this.handleCurrentChange(this.val)
                return this.$message.warning('删除成功')
            },
            uClick(row) {
                let that = this;
                console.log(row);
                that.Uform.wzNeiron = row.wzNeiron;
                that.Uform.wzHeader = row.wzHeader;
                that.Uform.id = row.id;
                this.UdialogFormVisible = true;
            },
            cClick() {
                this.CdialogFormVisible = true;
            },
            cformClick(row) {
                console.log(row)
                let that = this;
                var token = localStorage.getItem('token');
                let obj = {
                    wzNeiron: row.wzNeiron,
                    wzHeader: row.wzHeader
                }
                this.$http.post("http://127.0.0.1:9001/birthdaydemo/WenZhang/wenZhang", obj,
                    {headers: {'Authorization': 'Bearer ' + token,}}
                ).then(({data: res}) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })

                this.getListCom(this.val, 10)
                this.handleCurrentChange(this.val)
                this.CdialogFormVisible = false;
                return this.$message.success('新增成功');
            },
            uformClick(row) {
                console.log(row)
                let that = this;
                var token = localStorage.getItem('token');
                let obj = {
                    wzNeiron: row.wzNeiron,
                    wzHeader: row.wzHeader,
                    id: row.id
                }
                this.$http.put("http://127.0.0.1:9001/birthdaydemo/WenZhang/wenZhang", obj,
                    {headers: {'Authorization': 'Bearer ' + token,}}
                ).then(({data: res}) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })

                this.getListCom(this.val, 10)
                this.handleCurrentChange(this.val)
                this.UdialogFormVisible = false;
                return this.$message.success('修改成功');
            },
            getListCom(current, size) {
                let that = this;
                var token = localStorage.getItem('token');
                this.$http.get('http://127.0.0.1:9001/birthdaydemo/WenZhang/wenZhang', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    params: {current: current, size: size}
                }).then(({data: res}) => {
                    that.tableData = res.data.records;
                    that.total = res.data.total;
                }).catch(() => {
                })
            }
        },
        data() {
            return {
                val: 1,
                tableData: [],
                total: 600,
                Cform: {
                    wzNeiron: '',
                    wzHeader: '',
                },
                Uform: {
                    wzNeiron: '',
                    id: '',
                    wzHeader: '',
                },
                UdialogFormVisible: false,
                CdialogFormVisible: false,
                formLabelWidth: '120px'
            }
        }
    }
</script>


<style lang="scss" scoped>
    .el-calendar-table {
        float: left;
        margin-left: 100px;
        /*width: 50% !important;*/
    }

    .el-menu {
        width: 181px !important;
        min-height: 400px !important;
    }
    .el-table-size{
        width: 1000px;
    }
</style>

