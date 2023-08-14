<template>
    <div class="row justify-center">
        <div class="general-header col-12 col-md-11">
            <q-card>

                <div class="q-toolbar row no-wrap ">
                    <section class=" cursor-pointer text-subtitle1 " id="example--cards-with-media-content">
                        <div class="card-title text-bold">สายบัญชาการ</div>
                    </section>

                </div>

                <div class="q-gutter-md q-pa-md" style="padding-top:0px">
                    <div class="row justify-center">
                        <div class="q-gutter-md">
                            <q-btn icon="fa-solid fa-user-tie" no-caps class="btn_add text-weight-bolder" label="เพิ่มกลุ่ม"
                                @click="onSearch_sup()" />

                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="q-pa-md ">
                    <q-table :rows="rows" :columns="columns" row-key="name" table-header-class="text-white"
                        hide-pagination wrap-cells :rows-per-page-options="[0]" color="primary">
                        <template v-slot:body-cell-action="props">
                            <q-td :props="props">
                                <q-btn dense @click="onSearch_group(props.row)" flat size="15px">
                                    <q-icon style="color:#225780;" name="fa-solid fa-people-roof" />
                                </q-btn>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-img="props">
                            <q-td :props="props">
                                <q-avatar size="32px">
                                    <img :src="props.row.img">
                                </q-avatar>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-emp_id="props">
                            <q-td :props="props">
                           
                                    {{ props.row.emp_id }}
                             
                            </q-td>
                        </template>
                        <template v-slot:body-cell-fname="props">
                            <q-td :props="props">
                               
                                    {{ props.row.fname }}
                             
                            </q-td>
                        </template>
                        <template v-slot:body-cell-lname="props">
                            <q-td :props="props">
                           
                                    {{ props.row.lname }}
                                
                            </q-td>
                        </template>
                        <template v-slot:body-cell-delete="props">
                            <q-td :props="props">
                                <q-btn dense @click="alerts_confirm.confirm_show = true,
                                alerts_confirm.message = 'คุณแน่ใจที่จะลบกลุ่ม', alerts_confirm.row=props.row" flat size="10px">
                                    <q-icon color="red-7" name="fa-solid fa-trash" />
                                </q-btn>
                            </q-td>
                        </template>
                    </q-table>
                </div>
            </q-card>
        </div>

        <!-- dialog Add Sup-->
        <q-dialog v-model="dailog_sup.show" full-width transition-show="rotate" transition-hide="rotate">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">เลือกหัวหน้างาน</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <div class="q-gutter-md q-pa-xs" style="padding-buttom:0px">
                        <div class="col-12 row">
                            <div class="col-12 col-sm-6 row">
                                <div class="col-3 flex items-center q-px-sm"></div>
                                <div class="col-7 q-px-sm">
                                    <q-input label="ค้นหา" v-model="dailog_sup.search.text" :dense="true"
                                        color="indigo-10" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 row">
                                <div class="col-3 flex items-center q-px-sm"></div>
                                <div class="col-7 q-px-sm">
                                    <q-select label="แผนก" v-model="dailog_sup.search.dep" :dense="true"
                                        :options="departments" emit-value map-options color="indigo-10">
                                    </q-select>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-center">
                            <div class="q-gutter-md">
                                <q-btn icon="fa-solid fa-magnifying-glass" no-caps class="btn_search" label="Search"
                                    @click="onSearch_sup" />
                                <q-btn icon="fa-solid fa-arrows-rotate" no-caps class="btn_clear text-weight-bolder" @click="onClear_sup()"
                                    label="ล้าง" />
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <div class="q-pa-md ">
                        <q-table :rows="rows_sup" :columns="columns_sup" row-key="name" table-header-class="text-white"
                            color="primary" hide-pagination wrap-cells dense v-model:pagination="pagination">
                            <template v-slot:body-cell-action="props">
                                <q-td :props="props">
                                    <q-btn dense @click="onAdd_sup(props.row)" flat size="12px"
                                        :disable="props.row.active == '0'">
                                        <q-icon style="color:#225780;" name="fa-solid fa-user-plus" />
                                    </q-btn>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-active="props">
                                <q-td :props="props">
                                    <q-icon name="fa-solid fa-circle-check" size="xs" color="light-green-9"
                                        v-show="props.row.active == '1'" />
                                    <q-icon name="fa-solid fa-circle-xmark" size="xs" color="red-14"
                                        v-show="props.row.active == '0'" />
                                </q-td>
                            </template>
                        </q-table>
                        <div class="row q-mt-md flex-center">
                            <q-pagination v-model="pagination.page" :max-pages="10" :max="pagesNumber_0" direction-links
                                boundary-links color="mydrak" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- dialog manage group-->
        <q-dialog v-model="dailog_group.show" full-width transition-show="rotate" transition-hide="rotate">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">กลุ่มของ : {{ dailog_group.title }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section class="q-pb-none">
                    <div class="row q-pa-md">
                        <q-btn icon="fa-solid fa-user-plus" no-caps class="btn_add text-weight-bolder" label="เพิ่มสมาชิก"
                            @click="onSearch_emp()" />
                    </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <div class="q-pa-md ">
                        <q-table :rows="rows_group" :columns="columns_group" row-key="emp_id" dense
                            :filter="dailog_group.search" v-model:selected="dailog_group.selected"
                            :selected-rows-label="getSelectedString" selection="multiple" hide-pagination wrap-cells
                            v-model:pagination="pagination" table-header-class="text-white" color="primary">
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="dailog_group.search"
                                    placeholder="Search">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>
                            </template>
                            <template v-slot:body-cell-active="props">
                                <q-td :props="props">
                                    <q-icon name="fa-solid fa-circle-check" size="xs" color="light-green-9"
                                        v-show="props.row.active == '1'" />
                                    <q-icon name="fa-solid fa-circle-xmark" size="xs" color="red-14"
                                        v-show="props.row.active == '0'" />
                                </q-td>
                            </template>
                        </q-table>
                        <div class="row q-mt-md flex-center">
                            <q-pagination v-model="pagination.page" :max-pages="10" :max="pagesNumber_1" direction-links
                                boundary-links color="mydrak" />
                        </div>

                    </div>
                    <div class="row justify-center">
                        <div class="q-gutter-md">
                            <q-btn icon="fa-solid fa-user-minus" no-caps class="btn_del" label="ลบ"
                                :disable="dailog_group.selected.length == 0" @click="onDelete_emp()" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- dialog employee group-->
        <q-dialog v-model="dailog_emp.show" transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 1000px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="q-pa-md ">
                        <q-table :rows="rows_emp" :columns="columns_emp" :filter="dailog_emp.search" row-key="emp_id"
                            dense v-model:selected="dailog_emp.selected" :selected="selected" selection="multiple"
                            hide-pagination wrap-cells v-model:pagination="pagination" table-header-class="text-white"
                            color="primary">
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="dailog_emp.search"
                                    placeholder="Search">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>
                            </template>
                            <template v-slot:body-cell-active="props">
                                <q-td :props="props">
                                    <q-icon name="fa-solid fa-circle-check" size="xs" color="light-green-9"
                                        v-show="props.row.active == '1'" />
                                    <q-icon name="fa-solid fa-circle-xmark" size="xs" color="red-14"
                                        v-show="props.row.active == '0'" />
                                </q-td>
                            </template>
                            <template v-slot:header-selection="scope">
                                <q-checkbox v-model="scope.selected" dense />
                            </template>
                            <template v-slot:body-selection="scope">
                                <q-checkbox v-model="scope.selected" dense :disable="scope.row.active == '0'" />
                            </template>
                        </q-table>
                        <div class="row q-mt-md flex-center">
                            <q-pagination v-model="pagination.page" :max-pages="10" :max="pagesNumber_2" direction-links
                                boundary-links color="mydrak" />
                        </div>
                    </div>
                    <div class="row justify-center">
                        <div class="q-gutter-md">
                            <q-btn icon="fa-solid fa-user-plus" no-caps class="btn_add text-weight-bolder" label="เพิ่ม"
                                :disable="dailog_emp.selected.length == 0" @click="onAdd_emp()" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <Alert :info="alerts_confirm" @onConfirm="onDelete_group(alerts_confirm.row)"
            @onClose="alerts_confirm.confirm_show = false" />

    </div>
</template>
<script>
import { ref, reactive, computed, onMounted } from 'vue'
import masterService from '../service/master_service.js'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import Alert from '../components/Alert.vue'
export default {
    components: {
        Alert
    },
    setup() {
        let alerts_confirm = reactive({
            confirm_show: false,
            status: '',
            message: '',
            row: ','
        })
        const router = useRouter()
        const $q = useQuasar()
        const pagination = ref({
            sortBy: 'desc',
            descending: false,
            page: 1,
            rowsPerPage: 10
        })

        const columns = [
            { name: 'action', label: 'จัดการกลุ่ม', field: 'action', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'img', label: 'หัวหน้า', field: 'img', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'emp_id', label: 'รหัส', field: 'emp_id', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'fname', label: 'ชื่อ', field: 'fname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'lname', label: 'นามสกุล', field: 'lname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'delete', label: 'ลบ', field: 'delete', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
        ]

        const rows = reactive([])
        let departments = reactive([])
        let setDropdown = () => {
            let playload = {
                module: "getall"
            }
            masterService.GetDepInfo(playload).then(resp => {
                resp.data.body.forEach((item) => {
                    departments.push(
                        {
                            value: item.dep_id,
                            label: item.dep_name,
                        }
                    )
                })
            })
        }

        let getApprover = () => {
            $q.loading.show()
            rows.splice(0)
            let playload = {
                module: "getall"
            }
            masterService.GetApproverInfo(playload).then(resp => {
                resp.data.body.forEach((item) => {
                    rows.push(
                        {
                            group_id: item.group_id,
                            emp_id: item.emp_id,
                            fname: item.employee.fname,
                            lname: item.employee.lname,
                            img: "https://cdn.quasar.dev/img/boy-avatar.png",
                        }
                    )
                })
                rows.forEach((i,index) => {
                    let playload = {
                        module: "getImage",
                        emp_id: i.emp_id
                    }
                    masterService.GetProfile_picture(playload).then(resp => {
                        if (resp.data.status) {
                            rows[index].img = resp.data.url
                        }
                    })
                })
                $q.loading.hide()
            })
        }
        let onDelete_group = (item) => {
            $q.loading.show()
            let playload = {
                module: "delete",
                group_id: item.group_id
            }
            masterService.GetApproverInfo(playload).then(resp => {
                getApprover()
                $q.loading.hide()
                alerts_confirm.confirm_show = false
                alerts_confirm.row=null
            })
        }
        ////////////// -Sup- //////////////////
        const columns_sup = [
            { name: 'action', label: 'เพิ่ม', field: 'action', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'emp_id', label: 'รหัสหัวหน้า', field: 'emp_id', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'fname', label: 'ชื่อ', field: 'fname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'lname', label: 'นามสกุล', field: 'lname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'dep', label: 'แผนก', field: 'dep', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'active', label: 'Active', field: 'active', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
        ]
        const rows_sup = reactive([])
        let dailog_sup = reactive({
            show: false,
            emp_id: null,
            id_disible: false,
            search: { text: null, dep: null },
        })

        let onSearch_sup = () => {
            $q.loading.show()
            dailog_sup.show = true
            let playload = {
                module: "get_employee_none_sup",
                textsearch: dailog_sup.search.text,
                dep_search: dailog_sup.search.dep,
            }
            masterService.GetEmpInfo(playload).then(resp => {
                rows_sup.splice(0)
                resp.data.body.forEach((item) => {
                    rows_sup.push(
                        {
                            emp_id: item.emp_id,
                            fname: item.fname,
                            lname: item.lname,
                            dep: item.department.dep_name,
                            active: item.active,
                        }
                    )
                })
                $q.loading.hide()
            })
        }
        let onClear_sup = () => {
            dailog_sup.search.text = null
            dailog_sup.search.dep = null
            onSearch_sup()

        }
        let onAdd_sup = (item) => {
            $q.loading.show()
            let playload = {
                module: "insert",
                emp_id: item.emp_id,
            }
            masterService.GetApproverInfo(playload).then(resp => {
                dailog_sup.show = false
                getApprover()
                $q.loading.hide()
            })
        }
        //////////// Group /////////////
        const columns_group = [
            { name: 'emp_id', label: 'รหัสพนักงาน', field: 'emp_id', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'fname', label: 'ชื่อ', field: 'fname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'lname', label: 'นามสกุล', field: 'lname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'dep', label: 'แผนก', field: 'dep', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'active', label: 'Active', field: 'active', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
        ]
        const rows_group = reactive([])
        let dailog_group = reactive({
            show: false,
            title: null,
            selected: [],
            group_id: null,
            sup_id: null,
            search: null
        })
        let onSearch_group = (item) => {
            dailog_group.show = true
            dailog_group.title = item.fname + " " + item.lname + " (" + item.emp_id + ")"
            dailog_group.group_id = item.group_id
            dailog_group.sup_id = item.emp_id
            onload_group()
        }
        let onload_group = () => {
            $q.loading.show()
            dailog_group.selected = []
            rows_group.splice(0)
            let playload = {
                module: "getall",
                group_id: dailog_group.group_id,
            }
            masterService.GetCommandInfo(playload).then(resp => {
                resp.data.body.forEach((item) => {
                    rows_group.push({
                        command_id: item.command_id,
                        emp_id: item.employee.emp_id,
                        fname: item.employee.fname,
                        lname: item.employee.lname,
                        dep: item.employee.department.dep_name,
                        active: item.employee.active,
                    })
                })
                $q.loading.hide()
            })
        }
        let onDelete_emp = () => {
            $q.loading.show()
            let arr = []
            dailog_group.selected.forEach((i) => {
                arr.push(i.command_id)
            })
            let playload = {
                module: 'delete_member',
                command_id: arr
            }
            masterService.GetCommandInfo(playload).then(resp => {
                onload_group()
                $q.loading.hide()
            })
        }
        /////////////// Emp ////////////////////
        const columns_emp = [
            { name: 'emp_id', label: 'รหัสพนักงาน', field: 'emp_id', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'fname', label: 'ชื่อ', field: 'fname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'lname', label: 'นามสกุล', field: 'lname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'dep', label: 'แผนก', field: 'dep', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'active', label: 'Active', field: 'active', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
        ]
        const rows_emp = reactive([])
        let dailog_emp = reactive({
            show: false,
            title: null,
            selected: [],
            search: null,
        })
        let onSearch_emp = () => {
            $q.loading.show()
            dailog_emp.selected = []
            dailog_emp.show = true
            let playload = {
                module: "get_employee_none_group",
                sup_id: dailog_group.sup_id,
            }
            masterService.GetEmpInfo(playload).then(resp => {
                rows_emp.splice(0)
                resp.data.body.forEach((item) => {
                    rows_emp.push({
                        emp_id: item.emp_id,
                        fname: item.fname,
                        lname: item.lname,
                        dep: item.department.dep_name,
                        active: item.active,
                    })
                })
                $q.loading.hide()
            })
        }
        let onAdd_emp = () => {
            $q.loading.show()
            let arr = []
            dailog_emp.selected.forEach((i) => {
                arr.push(i.emp_id)
            })
            let playload = {
                module: "insert",
                data: arr,
                group_id: dailog_group.group_id
            }
            masterService.GetCommandInfo(playload).then(resp => {
                dailog_emp.show = false
                onload_group()
                $q.loading.hide()
            })
        }

        onMounted(() => {
            //Check Admin
            let Userlogin = JSON.parse(localStorage.getItem("UserINFO"))
            if (Userlogin.isadmin != 1) {
                router.push("/").then(() => { router.go() })
            }
            ///////////////
            getApprover()
            setDropdown()

        })

        return {
            // selected,
            setDropdown,
            departments,
            // Table
            columns,
            rows,
            onDelete_group,
            //function
            getApprover,
            //Sup
            dailog_sup,
            onAdd_sup,
            columns_sup,
            rows_sup,
            onSearch_sup,
            onClear_sup,
            //Group
            columns_group,
            rows_group,
            dailog_group,
            onSearch_group,
            onload_group,
            onDelete_emp,
            //Emp
            columns_emp,
            rows_emp,
            onSearch_emp,
            onAdd_emp,
            dailog_emp,
            //pagination
            pagination,
            pagesNumber_0: computed(() => Math.ceil(rows_sup.length / pagination.value.rowsPerPage)),
            pagesNumber_1: computed(() => Math.ceil(rows_group.length / pagination.value.rowsPerPage)),
            pagesNumber_2: computed(() => Math.ceil(rows_emp.length / pagination.value.rowsPerPage)),
            alerts_confirm


        }
    }
}
</script>

<style>

</style>