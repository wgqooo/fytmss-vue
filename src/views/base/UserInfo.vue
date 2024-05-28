<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
                :delFunc="handleDelete" :page-change="changePage" :editFunc="handleEdit">
                <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                    <p class="tips">Tips : 新增员工的初始密码为出生日期</p>
                </template>
            </TableCustom>
        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
            :close-on-click-modal="true" @close="closeDialog">
            <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
        </el-dialog>
        <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
            <TableDetail :data="viewData"></TableDetail>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="user-info">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { User } from '@/types/user';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import service from '@/utils/request';

// 查询相关
const query = reactive({
    name: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '用户名：', prop: 'name' }
])
const handleSearch = () => {
    changePage(1);
};

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 'empNo', label: '员工编号' },
    { prop: 'empName', label: '员工姓名' },
    { prop: 'empSex', label: '性别' },
    { prop: 'empBirthday', label: '出生日期' },
    { prop: 'empMobile', label: '手机号码' },
    { prop: 'empAddress', label: '家庭住址' },
    { prop: 'roleName', label: '职务' },
    { prop: 'operator', label: '操作',width:350 },
])
const page = reactive({
    index: 2,
    size: 1,
    total: 0,
})
const tableData = ref<User[]>([]);
const getData = async () => {
    //获取表格数据
    //const res = await fetchUserData()
    const res = await service({
        method: 'get',
        url: "base/user/list",
    });
    console.log(res.data.page)
    tableData.value = res.data.page.list;
    page.total = res.data.page.total;
};
getData();

const changePage = (val: number) => {
    page.index = val;
    getData();
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '100px',
    span: 12,
    list: [
        { type: 'input', label: '员工编号', prop: 'empNo', required: true},
        { type: 'input', label: '员工姓名', prop: 'empName', required: true },
        { type: 'select', label: '性别', prop: 'empSex', required: true, opts:[{value:'男',label:'男'},{value:'女',label:'女'}] },
        { type: 'date', label: '出生日期', prop: 'empBirthday', required: true},
        { type: 'input', label: '手机号码', prop: 'empMobile', required: true },
        { type: 'input', label: '家庭住址', prop: 'empAddress', required: true },
        { type: 'select', label: '职务', prop: 'roleName', required: true,
            opts:[{value:'财务总监',label:'财务总监'},
            {value:'出纳员',label:'出纳员'},
            {value:'超管',label:'超管'},
            {value:'售票员',label:'售票员'},
            {value:'检票员',label:'检票员'},
            {value:'管理员',label:'管理员'},
            {value:'普通员工',label:'普通员工'},
            {value:'旅行社',label:'旅行社'}
            ]
        },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: User) => {
    //员工编号不能修改
    options.value.list[0].disabled = true;
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = async (user:User) => {
    //加了async和await才能保证关闭弹窗后数据更新
    if(isEdit.value){
         await service({
             method:'post',
             url:'base/user/update',
             data:JSON.stringify(user)
        }).then(
            response => {
                if(response.data.code == 0){
                    ElMessage.success(response.data.msg)
                }else if(response.data.code == 500){
                    ElMessage.error(response.data.msg)
                }
        });
    }else{
        await service({
            method:'post',
            url:'base/user/save',
            data:JSON.stringify(user)
        }).then(
            response => {
                if(response.data.code == 0){
                    ElMessage.success(response.data.msg)
                }else if(response.data.code == 500){
                    ElMessage.error(response.data.msg)
                }else if(response.data.code == 400){
                    ElMessage.error(response.data.msg)
                }
        });
    }
    closeDialog();
    getData();
};

const closeDialog = () => {
    //修改用户信息的时候不能修改员工编号，新增用户信息的时候当然可以
    options.value.list[0].disabled = false;
    visible.value = false;
    isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: []
});
const handleView = (row: User) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
    { prop: 'empNo', label: '员工编号' },
    { prop: 'empName', label: '员工姓名' },
    { prop: 'empSex', label: '性别' },
    { prop: 'empBirthday', label: '出生日期' },
    { prop: 'empMobile', label: '手机号码' },
    { prop: 'empAddress', label: '家庭住址' },
    { prop: 'roleName', label: '职务' },
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = (row: User) => {
    ElMessage.success('删除成功');
}
</script>

<style scoped>
.tips {
    color: #333; /* 文字颜色 */
    font-size: 14px; /* 字体大小 */
    padding: 5px; /* 内边距 */
    border: 1px solid #ccc; /* 边框 */
    background-color: #f9f9f9; /* 背景色 */
    transition: color 0.3s, background-color 0.3s; /* 过渡效果 */
    margin-top: 10px;
    cursor:cell; /* 鼠标样式 */
  }

  /* 鼠标经过时的样式 */
  .tips:hover {
    background-color: #bfc; /* 背景色 */
  }
</style>