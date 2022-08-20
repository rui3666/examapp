<template>
    <div class="about">
        <head-top></head-top>
        <h1>题库管理模块</h1>
<!--        <nav>-->
<!--            <router-link to="/home">Home</router-link>-->
<!--            |-->
<!--            <router-link to="/about">About</router-link>-->
<!--        </nav>-->
<!--        <el-button type="primary" @click=cClick>新增一条数据</el-button>-->
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
                        label="题库id"
                        width="100">
                </el-table-column> <el-table-column
                        prop="tkType"
                        label="题库类型"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="tkTimu"
                        show-overflow-tooltip
                        label="题目"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="tkA"
                        show-overflow-tooltip
                        label="答案A"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="tkB"
                        show-overflow-tooltip
                        label="答案B"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="tkC"
                        show-overflow-tooltip
                        label="答案C"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="tkD"
                        show-overflow-tooltip
                        label="答案D"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="tkJiexi"
                        show-overflow-tooltip
                        label="解析"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="tkAnswer"
                        show-overflow-tooltip
                        label="正確答案"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
<!--                        <el-button @click="uClick(scope.row)" type="text" size="small">编辑</el-button>-->
                        <el-button @click="rClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

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

                this.$http.delete('http://127.0.0.1:9001/birthdaydemo/TiKu/tiKu/' + row.id, {
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
            // uClick(row) {
            //     let that = this;
            //     console.log(row);
            //     that.Uform.wzNeiron = row.wzNeiron;
            //     that.Uform.wzHeader = row.wzHeader;
            //     that.Uform.id = row.id;
            //     this.UdialogFormVisible = true;
            // },
            // cClick() {
            //     this.CdialogFormVisible = true;
            // },
            // cformClick(row) {
            //     console.log(row)
            //     let that = this;
            //     var token = localStorage.getItem('token');
            //     let obj = {
            //         wzNeiron: row.wzNeiron,
            //         wzHeader: row.wzHeader
            //     }
            //     this.$http.post("http://127.0.0.1:9001/birthdaydemo/WenZhang/wenZhang", obj,
            //         {headers: {'Authorization': 'Bearer ' + token,}}
            //     ).then(({data: res}) => {
            //         console.log(res)
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            //
            //     this.getListCom(this.val, 10)
            //     this.handleCurrentChange(this.val)
            //     this.CdialogFormVisible = false;
            //     return this.$message.success('新增成功');
            // },
            // uformClick(row) {
            //     console.log(row)
            //     let that = this;
            //     var token = localStorage.getItem('token');
            //     let obj = {
            //         wzNeiron: row.wzNeiron,
            //         wzHeader: row.wzHeader,
            //         id: row.id
            //     }
            //     this.$http.put("http://127.0.0.1:9001/birthdaydemo/WenZhang/wenZhang", obj,
            //         {headers: {'Authorization': 'Bearer ' + token,}}
            //     ).then(({data: res}) => {
            //         console.log(res)
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            //
            //     this.getListCom(this.val, 10)
            //     this.handleCurrentChange(this.val)
            //     this.UdialogFormVisible = false;
            //     return this.$message.success('修改成功');
            // },
            getListCom(current, size) {
                let that = this;
                var token = localStorage.getItem('token');
                console.log("token:");
                console.log(token);
                this.$http.get('http://127.0.0.1:9001/birthdaydemo/TiKu/tiKu', {
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

