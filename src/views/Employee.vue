<template>
    <div class="row justify-center">
        <div class="general-header col-12 col-md-11">
            <q-card>
                <div class="q-toolbar row no-wrap ">
                    <section class=" cursor-pointer text-subtitle1 " id="example--cards-with-media-content">
                        <div class="card-title text-bold">พนักงาน</div>
                    </section>
                </div>
                <div class="q-gutter-md q-pa-md" style="padding-top:0px">
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-3 flex items-center q-px-sm"></div>
                            <div class="col-7 q-px-sm">
                                <q-input label="ค้นหา" :dense="true" color="indigo-10" v-model="search.text" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-3 flex items-center q-px-sm"></div>
                            <div class="col-7 q-px-sm">
                                <q-select label="แผนก" :dense="true" v-model="search.department" :options="departments"
                                    emit-value map-options color="indigo-10">

                                </q-select>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-center">
                        <div class="q-gutter-md">
                            <q-btn icon="fa-solid fa-magnifying-glass" no-caps class="btn_search text-weight-bolder" label="ค้นหา"
                                @click="onSearch" />
                            <q-btn icon="fa-solid fa-arrows-rotate" no-caps class="btn_clear text-weight-bolder" @click="onClear"
                                label="ล้าง" />
                            <q-btn icon="fa-solid fa-plus" no-caps class="btn_add text-weight-bolder" label="สร้าง" @click="onAdd" />
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="q-pa-md ">

                    <q-table :rows="rows" :columns="columns" row-key="name" table-header-class="text-white" hide-pagination
                        v-model:pagination="pagination" color="primary" dense wrap-cells>
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
                        <template v-slot:body-cell-department="props">
                            <q-td :props="props">
                                {{ props.row.department.label }}
                            </q-td>
                        </template>
                        <template v-slot:body-cell-salary="props">
                            <q-td :props="props">
                                {{ props.row.salary }}
                            </q-td>
                        </template>
                        <template v-slot:body-cell-email="props">
                            <q-td :props="props">
                                {{ props.row.email }}
                            </q-td>
                        </template>
                        <template v-slot:body-cell-isadmin="props">
                            <q-td :props="props">
                                <q-icon name="fa-solid fa-circle-check" size="xs" color="pink-12"
                                    v-show="props.row.isadmin == 1" />
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
                        <template v-slot:body-cell-action="props">
                            <q-td :props="props">
                                <q-btn dense @click="onEdit(props.row)" flat size="10px">
                                    <q-icon style="color:#225780;" name="fa-solid fa-pen-to-square" />
                                </q-btn>
                            </q-td>
                        </template>
                    </q-table>
                    <div class="row q-mt-md flex-center">
                        <q-pagination v-model="pagination.page" :max-pages="10" :max="pagesNumber" direction-links
                            boundary-links color="mydrak" />
                    </div>
                    <div class="row q-mt-md ">
                        Total : {{ rows.length }}
                    </div>

                </div>
            </q-card>
        </div>

        <!-- dialog -->
        <q-dialog v-model="dailog.show" transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-toolbar class="bg_dark">
                    <q-toolbar-title>
                        <span class="text-weight-bold">{{ dailog.title }}</span>
                       พนักงาน
                    </q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>
                <q-card-section>
                    <div class="q-gutter-xs q-pa-md">
                        <div class="row flex items-center justify-center">
                            <div class="col-2 text-bold">
                                รหัสพนักงาน : <span class="req-red">*</span>
                            </div>
                            <div class="col-6 ">
                                <q-input :dense="true" color="indigo-10" v-model="dailog.emp_id"
                                    :disable="dailog.id_disible" :error="v$.emp_id.$error"
                                    :error-message="'กรุณาระบุรหัสพนักงาน'" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-2 text-bold">
                                ชื่อ : <span class="req-red">*</span>
                            </div>
                            <div class="col-6">
                                <q-input :dense="true" color="indigo-10" v-model="dailog.fname" :error="v$.fname.$error"
                                    :error-message="'กรุณาระบุชื่อ'" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-2 text-bold">
                                นามสกุล : <span class="req-red">*</span>
                            </div>
                            <div class="col-6">
                                <q-input :dense="true" color="indigo-10" v-model="dailog.lname" :error="v$.lname.$error"
                                    :error-message="'กรุณาระบุนามสกุล'" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-2 text-bold">
                                แผนก : <span class="req-red">*</span>
                            </div>
                            <div class="col-6">
                                <q-select :dense="true" color="indigo-10" v-model="dailog.department" :options="departments"
                                    map-options @update:model-value="onSelect_dep(dailog.department)"
                                    :error="v$.department.$error" :error-message="'กรุณาเลือกแผนก'" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-2 text-bold">
                                เงินเดือน : <span class="req-red">*</span>
                            </div>
                            <div class="col-6">
                                <q-input type="number" :dense="true" color="indigo-10" v-model="dailog.salary"
                                    :error="v$.salary.$error" :error-message="'กรุณาระบุเงินเดือน'" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-2 text-bold">
                                อีเมลล์ : <span class="req-red">*</span>
                            </div>
                            <div class="col-6">
                                <q-input type="text" :dense="true" color="indigo-10" v-model="dailog.email"
                                    :error="v$.email.$error" :error-message="'กรุณาระบุอีเมลล์ให้ถูกต้อง'" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center ">
                            <div class="col-2 text-bold ">
                                ผู้ดูแลระบบ :
                            </div>
                            <div class="col-6 " items-center>
                                <q-checkbox :dense="true" :disable="dailog.department.value != 1" color="indigo-10"
                                    v-model="dailog.isadmin" style="height:40px" true-value="1" false-value="0" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center ">
                            <div class="col-2 text-bold ">
                                สถาณะ :
                            </div>
                            <div class="col-6 " items-center>
                                <q-radio v-model="dailog.active" val="1" label="ใช้งาน" color="light-green-9" />
                                <q-radio v-model="dailog.active" val="0" label="ไม่ใช้งาน" color="red-14" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center " v-show="dailog.id_disible">
                            <div class="col-2 text-bold ">
                                รหัสผ่าน :
                            </div>
                            <div class="col-6 " items-center>
                                <q-btn label="คืนค่ารหัสผ่านเริ่มต้น" no-caps class="text-bold" color="teal-5" @click="alerts_confirm.confirm_show = true,
                                    alerts_confirm.message = 'คุณแน่ใจที่จะเปลี่ยนเป็นรหัสผ่านเริ่มต้น'" />
                            </div>
                        </div>
                        <div class="row justify-center ">
                            <div>
                                <q-card-section class="q-pt-md">
                                    <div class="q-gutter-md">
                                        <q-btn icon="save" label="บันทึก" no-caps class="btn_add text-bold"
                                            @click="submitForm" />
                                        <q-btn label="ปิด"  no-caps class="btn_search text-bold" v-close-popup />
                                    </div>
                                </q-card-section>
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <Alert :info="alerts_confirm" @onConfirm="resetPassword" @onClose="alerts_confirm.confirm_show = false" />
        <Alert :info="alerts_success" @onClose="alerts_success.success_show = false" />
        <Alert :info="alerts_error" @onClose="alerts_error.error_show = false" />
    </div>
</template>
<script>
import { ref, reactive, computed, onMounted } from 'vue'
import masterService from '../service/master_service.js'
import useVuelidate from '@vuelidate/core'
import Alert from '../components/Alert.vue'
import { required, email } from '@vuelidate/validators'
import En_password from '../service/encrypt_password.js'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router';
export default {
    components: {
        Alert
    },
    setup() {
        const router = useRouter()
        const $q = useQuasar()
        let alerts_error = reactive({
            error_show: false,
            status: '',
            message: '',
        })
        let alerts_success = reactive({
            success_show: false,
            status: '',
            message: '',
        })
        let alerts_confirm = reactive({
            confirm_show: false,
            status: '',
            message: '',
        })
        const pagination = ref({
            sortBy: 'desc',
            descending: false,
            page: 1,
            rowsPerPage: 10
        })
        let dailog = reactive({
            show: false,
            title: 'Add',
            emp_id: null,
            fname: null,
            lname: null,
            department: { label: '', value: null },
            salary: null,
            email: null,
            isadmin: null,
            active: '1',
            id_disible: false,
        })
        const columns = [
            { name: 'img', label: 'รูป', field: 'img', headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'emp_id', label: 'รหัสพนักงาน', field: 'emp_id', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'fname', label: 'ชื่อ', field: 'fname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'lname', label: 'นามสกุล', field: 'lname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'department', label: 'แผนก', field: 'department', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'salary', label: 'เงินเดือน', field: 'salary', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'email', label: 'อีเมลล์', field: 'email', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'isadmin', label: 'ผู้ดูแลระบบ', field: 'isadmin', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'active', label: 'ใช้งาน', field: 'Active', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'action', label: 'แก้ไข', field: 'action', headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },

        ]
        const rows = reactive([])
        let search = reactive({
            text: null,
            department: null,
        })
        let departments = reactive([
        ])
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

        let onSearch = () => {
            $q.loading.show()
            rows.splice(0)
            let playload = {
                module: "getall",
                textsearch: search.text,
                dep_search: search.department,
            }
            masterService.GetEmpInfo(playload).then(resp => {
                resp.data.body.forEach((item) => {
                    rows.push(
                        {
                            emp_id: item.emp_id,
                            fname: item.fname,
                            lname: item.lname,
                            department: { value: item.department.dep_id, label: item.department.dep_name },
                            salary: item.salary,
                            email: item.email,
                            isadmin: item.isadmin,
                            active: item.active,
                            img: "https://cdn.quasar.dev/img/boy-avatar.png"
                        }
                    )
                })
                rows.forEach((i, index) => {
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
        let onClear = () => {
            search.text = null
            search.department = null
            onSearch()
        }
        let onSelect_dep = (item) => {
            if (item.value != 1) {
                dailog.isadmin = "0"
            }
        }
        let onAdd = () => {
            v$.value.$reset()
            dailog.show = true
            dailog.title = 'เพิ่ม'
            dailog.emp_id = null
            dailog.fname = null
            dailog.lname = null
            dailog.department = { label: '', value: null }
            dailog.salary = null
            dailog.email = null
            dailog.isadmin = "0"
            dailog.active = "1"
            dailog.id_disible = false

        }
        let onEdit = (item) => {
            v$.value.$reset()

            dailog.show = true
            dailog.title = 'แก้ไข'
            dailog.emp_id = item.emp_id
            dailog.fname = item.fname
            dailog.lname = item.lname
            dailog.department = item.department
            dailog.salary = item.salary
            dailog.email = item.email
            dailog.isadmin = item.isadmin
            dailog.id_disible = true
            dailog.active = item.active
            console.log(dailog)
        }
        let onSave = () => {
            $q.loading.show()
            let playload = {
                module: dailog.title == 'เพิ่ม' ? 'insert' : 'update',
                emp_id: dailog.emp_id.toString(),
                fname: dailog.fname,
                lname: dailog.lname,
                dep_id: dailog.department.value,
                salary: dailog.salary,
                email: dailog.email,
                password: En_password.Encrypt(dailog.email),
                isadmin: dailog.isadmin,
                active: dailog.active
            }
            masterService.GetEmpInfo(playload).then(resp => {
                if (resp.data.status) {
                    alerts_success.success_show = true
                    alerts_success.message = resp.data.message
                    dailog.show = false
                    onSearch()
                    $q.loading.hide()
                }
                else if (!resp.data.status) {
                    alerts_error.error_show = true
                    alerts_error.message = resp.data.message
                    $q.loading.hide()
                }
                else {
                    alerts_error.error_show = true
                    alerts_error.message = 'ตรวจสอบรหัสพนักงาน'
                    $q.loading.hide()
                }

            })
        }
        let resetPassword = () => {
            $q.loading.show()
            let playload = {
                module: "default_password",
                emp_id: dailog.emp_id.toString(),
                email: dailog.email,
                password: En_password.Encrypt(dailog.email),
            }
            masterService.GetEmpInfo(playload).then(resp => {
                alerts_confirm.confirm_show = false
                alerts_success.success_show = true
                alerts_success.message = resp.data.message
                $q.loading.hide()
                // onSearch()
            })
        }
        const rules = computed(() => {
            return {
                emp_id: { required },
                fname: { required },
                lname: { required },
                department: {
                    value: { required }
                },
                salary: { required },
                email: { required, email },
            }
        });
        const v$ = useVuelidate(rules, dailog);
        const submitForm = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) {
                console.log(v$.value.$errors)
            }
            else {
                console.log(isFormCorrect)
                onSave()
            }
        }

        onMounted(() => {
            //Check Admin
            let Userlogin = JSON.parse(localStorage.getItem("UserINFO"))
            if (Userlogin.isadmin != 1) {
                router.push("/").then(() => { router.go() })
            }
            ///////////////
            onSearch()
            setDropdown()
        })
        return {
            //Search
            search,
            //Dropdown
            departments,
            // Table
            columns,
            rows,
            //function
            onSearch,
            onClear,
            onAdd,
            onEdit,
            onSave,
            onSelect_dep,
            //dailog
            dailog,
            //validate
            v$,
            submitForm,
            //resetPassword
            resetPassword,
            confirm: ref(false),
            //Alert
            alerts_success,
            alerts_confirm,
            alerts_error,
            //pagination
            pagination,
            pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage)),



        }
    }
}
</script>

<style></style>