<template>
    <div class="row justify-center">
        <div class="general-header col-12 col-md-11">
            <q-card>

                <div class="q-toolbar row no-wrap ">
                    <section class=" cursor-pointer text-subtitle1 " id="example--cards-with-media-content">
                        <div class="card-title text-bold">แผนก</div>
                    </section>

                </div>

                <div class="q-gutter-md q-pa-md" style="padding-top:0px">
                    <div class="col-12 row justify-center">
                        <div class="col-7 q-px-sm items-center ">
                            <q-input label="ระบุคำค้นหา" :dense="true" color="indigo-10" v-model="filter" />
                        </div>
                    </div>
                </div>
                <div class="row justify-center">
                    <div class="q-gutter-md">
                        <!-- <q-btn icon="fa-solid fa-magnifying-glass" no-caps class="btn_search" label="Search"
                            @click="onSearch" /> -->
                        <q-btn icon="fa-solid fa-arrows-rotate" no-caps class="btn_clear text-weight-bolder" @click="onClear"
                            label="ล้าง" />
                        <q-btn icon="fa-solid fa-plus" no-caps class="btn_add text-weight-bolder" label="สร้าง" @click="onAdd" />
                    </div>


                </div>

                <!-- Table -->
                <div class="q-pa-md ">
                    <q-table :rows="rows" :columns="columns" row-key="dep_id" table-header-class="text-white" dense
                        wrap-cells v-model:pagination="pagination" hide-pagination color="primary" :filter="filter">
                        <template v-slot:body-cell-dep_id="props">
                            <q-td :props="props">
                                    {{ props.row.dep_id }}
                            </q-td>
                        </template>
                        <template v-slot:body-cell-dep_name="props">
                            <q-td :props="props">
                                    {{ props.row.dep_name }}
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
                    <div class="row q-mt-md">
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
                        Empolyee
                    </q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>
                <q-card-section>
                    <div class="q-pa-md ">
                        <div class="row flex items-center justify-center">
                            <div class="col-2 text-bold">
                                รหัสแผนก : <span class="req-red">*</span>
                            </div>
                            <div class="col-6 ">
                                <q-input :dense="true" color="indigo-10" v-model="dailog.dep_id"
                                    :disable="dailog.id_disible" :error="v$.dep_id.$error"
                                    :error-message="'กรุณาระบุรหัสแผนก'" />
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-2 text-bold">
                                ชื่อแผนก : <span class="req-red">*</span>
                            </div>
                            <div class="col-6">
                                <q-input :dense="true" color="indigo-10" v-model="dailog.dep_name"
                                    :error="v$.dep_name.$error" :error-message="'กรุณาระบุชื่อแผนก'" />
                            </div>
                        </div>
                        <div class="row justify-center ">
                            <div>
                                <q-card-section class="q-pt-xl">
                                    <div class="q-gutter-md">
                                        <q-btn icon="save" label="บันทึก" no-caps class="btn_add text-bold"
                                            @click="submitForm()" />
                                        <q-btn label="ปิด"  no-caps class="btn_search text-bold" v-close-popup />
                                    </div>
                                </q-card-section>
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
    <Alert :info="alerts_error" @onClose="alerts_error.error_show = false" />
    <Alert :info="alerts_success" @onClose="alerts_success.success_show = false" />
</template>
<script>
import { ref, reactive, computed, onMounted } from 'vue'
import masterService from '../service/master_service.js'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router';
import Alert from '../components/Alert.vue'
export default {
    components: {
        Alert
    },
    setup() {
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
        const router = useRouter()
        const $q = useQuasar()
        let filter = ref(null)
        let dailog = reactive({
            show: false,
            title: 'Add',
            dep_id: null,
            dep_name: null,
            id_disible: false,

        })
        const pagination = ref({
            // sortBy: 'dep_id',
            descending: false,
            page: 1,
            rowsPerPage: 10
        })
        const columns = [
            { name: 'dep_id', label: 'รหัสแผนก', field: 'dep_id', sortable: true, headerStyle: { width: '20%', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'dep_name', label: 'ชื่อแผนก', field: 'dep_name', sortable: true, headerStyle: { width: '60%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'action', label: 'แก้ไข', field: 'action', headerStyle: { width: '20%', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
        ]

        const rows = reactive([
        ])


        let onSearch = () => {
            $q.loading.show()
            rows.splice(0)
            let playload = {
                module: "getall"
            }
            masterService.GetDepInfo(playload).then(resp => {
                resp.data.body.forEach((item) => {
                    console.log(item)
                    rows.push(
                        {
                            dep_id: item.dep_id,
                            dep_name: item.dep_name,
                        }
                    )
                })
                $q.loading.hide()
            })
        }
        let onClear = () => {
            filter.value = null
            onSearch()
        }
        let onAdd = () => {
            v$.value.$reset()
            dailog.show = true
            dailog.title = 'เพิ่ม'
            dailog.dep_id = null
            dailog.dep_name = null
            dailog.id_disible = false
        }
        let onEdit = (item) => {
            v$.value.$reset()
            dailog.show = true
            dailog.title = 'แก้ไข'
            dailog.dep_id = item.dep_id
            dailog.dep_name = item.dep_name
            dailog.id_disible = true
        }
        let onSave = () => {
            $q.loading.show()
            let playload = {
                module: dailog.title == 'เพิ่ม' ? 'insert' : 'update',
                dep_id: dailog.dep_id,
                dep_name: dailog.dep_name
            }
            masterService.GetDepInfo(playload).then(resp => {
                console.log('Focus=>>>>>>>>>', resp.data.status)
                if (resp.data.status) {
                    alerts_success.success_show = true
                    alerts_success.message = 'เพิ่มสำเร็จ'
                    dailog.show = false
                    onSearch()
                    $q.loading.hide()
                }
                else {
                    alerts_error.error_show = true
                    alerts_error.message = 'ตรวจสอบรหัสแผนก'
                    $q.loading.hide()
                }

            })
        }
        const rules = computed(() => {
            return {
                dep_id: { required },
                dep_name: { required },
            }
        });
        const v$ = useVuelidate(rules, dailog);
        const submitForm = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) {
                console.log(isFormCorrect)
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
            // setDropdown()
        })

        return {
            // Table
            filter,
            columns,
            rows,
            //function
            onSearch,
            onClear,
            onAdd,
            onEdit,
            //dailog
            dailog,
            onSave,
            //validate
            v$,
            submitForm,
            //pagination
            pagination,
            pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage)),
            //
            alerts_success,
            alerts_error,
        }
    }
}
</script>

<style>

</style>