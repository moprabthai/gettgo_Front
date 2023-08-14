<template>
    <div class="row justify-center">
        <div class="general-header col-12 col-md-11">
            <q-card>

                <div class="q-toolbar row no-wrap ">
                    <section class=" cursor-pointer text-subtitle1 " id="example--cards-with-media-content">
                        <div class="card-title text-bold">กะงาน</div>
                    </section>

                </div>

                <div class="q-gutter-md q-pa-md" style="padding-top:0px">
                    <div class="row justify-center">
                        <div class="q-gutter-md">
                            <q-btn icon="fa-solid fa-calendar-plus" no-caps class="btn_add text-weight-bolder" label="เพิ่มกะงาน"
                                @click="onCreate_shift()" />
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="q-pa-md ">
                    <q-table :rows="rows_shift" :columns="columns_shift" row-key="name" table-header-class="text-white"
                        color="primary" hide-pagination wrap-cells :rows-per-page-options="[0]">
                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="action" :props="props">
                                    <q-btn dense @click="onSearch_shift_mrg(props.row)" flat size="15px">
                                        <q-icon style="color:#225780;" name="fa-solid fa-people-roof" />
                                    </q-btn>
                                </q-td>
                                <q-td key="shift_name" :props="props">
                                    
                                        {{ props.row.shift_name }}
                                  
                                </q-td>
                                <q-td key="time_start" :props="props">
                             
                                        {{ props.row.time_start }}
                             
                                </q-td>
                                <q-td key="time_end" :props="props">
                              
                                        {{ props.row.time_end }}
                              
                                </q-td>
                                <q-td key="break" :props="props">
                            
                                        {{ props.row.break }}
                             
                                </q-td>
                                <q-td key="weekend" :props="props">
                                    <!-- <q-badge color="purple"> -->
                                    {{ props.row.weekend }}
                                    <!-- </q-badge> -->
                                </q-td>
                                <q-td key="edit" :props="props">
                                    <q-btn dense @click="onEdit_shift(props.row)" flat size="10px">
                                        <q-icon style="color:#225780;" name="fa-solid fa-pen-to-square" />
                                    </q-btn>
                                </q-td>
                                <q-td key="del" :props="props">
                                    <q-btn dense @click="alerts_confirm.confirm_show = true,
                                        alerts_confirm.message = 'คุณแน่ใจที่จะลบกะ', alerts_confirm.row=props.row" flat
                                        size="10px">
                                        <q-icon color="red-7" name="fa-solid fa-trash" />
                                    </q-btn>
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </div>
            </q-card>
        </div>

        <!-- dialog Add Shift-->
        <q-dialog v-model="dailog_shift.show" transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-toolbar class="bg_dark">
                    <q-toolbar-title>
                        <span class="text-weight-bold"></span>
                        {{ dailog_shift.title }} กะงาน
                    </q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>
                <q-card-section>
                    <div class="q-gutter-sm q-pa-md">
                        <div class="row flex items-center justify-center">
                            <div class="col-sm-4 text-bold">
                                ชื่อกะ : <span class="req-red">*</span>
                            </div>
                            <div class="col-sm-6 ">
                                <q-input :dense="true" color="indigo-10" v-model="dailog_shift.shift_name"
                                    :error="v$.shift_name.$error" :error-message="'กรุณาระบุชื่อกะ'" />
                            </div>

                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-4 text-bold">
                                เวลาเข้างาน : <span class="req-red">*</span>
                            </div>
                            <div class="col-sm-6">
                                <q-input v-model="dailog_shift.time_start" mask="time" :dense="true"
                                    :error="v$.time_start.$error" :error-message="'กรุณาระบุเวลาเข้างาน'">
                                    <template v-slot:append>
                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="dailog_shift.time_start" format24h color="mypink">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="ปิด"  color="primary" flat />
                                                    </div>
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-4 text-bold">
                                เวลาออกงาน : <span class="req-red">*</span>
                            </div>
                            <div class="col-sm-6">
                                <q-input v-model="dailog_shift.time_end" mask="time" :dense="true"
                                    :error="v$.time_end.$error" :error-message="'กรุณาระบุเวลาออกงาน'">
                                    <template v-slot:append>
                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="dailog_shift.time_end" format24h color="mypink">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="ปิด"  color="primary" flat />
                                                    </div>
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-4 text-bold">
                                เวลาพักก่อนล่วงเวลา : <span class="req-red">*</span>
                            </div>
                            <div class="col-sm-5">
                                <q-select :options="breaks" v-model="dailog_shift.break" :dense="true"
                                    :error="v$.break.$error" :error-message="'กรุณาเลือกเวลาพักก่อนล่วงเวลา'" />
                            </div>
                            <div class="col-sm-1 ">
                                นาที
                            </div>
                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-4 text-bold">
                                วันหยุดประจำสัปดาห์ : <span class="req-red">*</span>
                            </div>
                            <div class="col-6">
                                <q-select v-model="dailog_shift.weekend" multiple :options="dailog_shift.weekends"
                                    :dense="true" :error="v$.weekend.$error"
                                    :error-message="'กรุณาเลือกวันหยุดประจำสัปดาห์อย่างน้อย 1 วัน'" />
                            </div>
                        </div>

                        <div class="row flex items-center justify-center">
                            <div class="col-4 text-bold">
                                หักพัก 1 ชั่วโมงเมื่อเบิกเกิน : <span class="req-red">*</span>
                            </div>
                            <div class="col-sm-5">
                                <q-input type="number" min="0" :dense="true" color="indigo-10"
                                    v-model="dailog_shift.minus_hours" :error="v$.minus_hours.$error"
                                    :error-message="'กรุณาระบุจำนวนชั่วโมง'" />
                            </div>
                            <div class="col-sm-1 ">
                                ชั่วโมง
                            </div>
                        </div>

                        <div class="row flex items-center justify-center">
                            <div class="col-4 text-bold">
                                การคำนวนราคาต่อชั่วโมง : <span class="req-red">*</span>
                            </div>
                            <div class="col-sm-6 ">
                                <q-checkbox left-label v-model="dailog_shift.cal_default" label="ค่าเริ่มต้น"
                                    @update:model-value="default_cal()" />
                            </div>

                        </div>
                        <div class="row flex items-center justify-center">
                            <div class="col-3 text-bold">
                                สูตรการคำนวน :
                            </div>

                            <div class="col-sm-4">
                                <q-select v-model="dailog_shift.cal_type" :options="dailog_shift.operation" :dense="true"
                                    map-options emit-value :disable="dailog_shift.cal_default" :error="v$.cal_price.$error"
                                    @update:model-value="default_cal()" :error-message="'กรุณาระบุ'" />
                            </div>

                            <div class="col-sm-1"></div>
                            <div class="col-sm-2">

                                <q-input type="text" :dense="true" color="indigo-10" v-model="validateInput"
                                    :disable="dailog_shift.cal_default" :error="v$.cal_price.$error"
                                    :error-message="'กรุณาระบุ'" />
                            </div>
                        </div>
                        <div class="row justify-center ">
                            <div>
                                <q-card-section class="q-pt-xl">
                                    <div class="q-gutter-md">
                                        <q-btn icon="save" label="บันทึก" no-caps class="btn_add text-bold"
                                            @click="ValidateForm()" />
                                        <q-btn label="ปิด"  no-caps class="btn_search text-bold" v-close-popup />
                                    </div>
                                </q-card-section>
                            </div>
                        </div>
                    </div>

                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- dialog manage shift-->
        <q-dialog v-model="dailog_shift_mgr.show" full-width transition-show="rotate" transition-hide="rotate">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Shift : {{ dailog_shift_mgr.title }}</div>
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
                        <q-table :rows="rows_shift_mgr" :columns="columns_shift_mgr" row-key="emp_id" dense
                            :filter="dailog_shift_mgr.search" v-model:selected="dailog_shift_mgr.selected"
                            :selected-rows-label="getSelectedString" selection="multiple" hide-pagination wrap-cells
                            v-model:pagination="pagination" table-header-class="text-white" color="primary">
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="dailog_shift_mgr.search"
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
                                :disable="dailog_shift_mgr.selected.length == 0" @click="onDelete_emp()" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- dialog employee shift member-->
        <q-dialog v-model="dailog_emp.show" transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 1000px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="q-pa-md ">
                        <q-table :rows="rows_emp" :columns="columns_emp" :filter="dailog_emp.search" row-key="emp_id" dense
                            v-model:selected="dailog_emp.selected" :selected="selected" selection="multiple" hide-pagination
                            wrap-cells v-model:pagination="pagination" table-header-class="text-white" color="primary">
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="dailog_emp.search" placeholder="Search">
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
        <Alert :info="alerts_confirm" @onConfirm="onDelete_shift(alerts_confirm.row)"
            @onClose="alerts_confirm.confirm_show = false" />
    </div>
</template>
<script>
import { ref, reactive, computed, onMounted } from 'vue'
import masterService from '../service/master_service.js'
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router';
import { def } from '@vue/shared'
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
        ////////////// Table /////////////////////
        const columns_shift = [
            { name: 'action', label: 'จัดการพนักงาน', field: 'action', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'shift_name', label: 'ชื่อกะ', field: 'shift_name', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'time_start', label: 'เวลาเข้างาน', field: 'time_start', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'time_end', label: 'เวลาออกงาน', field: 'time_end', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'break', label: 'พักก่อนล่วงเวลา', field: 'break', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'weekend', label: 'วันหยุดประจำสัปดาห์', field: 'weekend', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'edit', label: 'แก้ไข', field: 'edit', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'del', label: 'ลบ', field: 'del', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },

        ]
        let rows_shift = reactive([])
        let onSearch_shift = () => {
            $q.loading.show()
            rows_shift.splice(0)
            let playload = {
                module: 'getall'
            }
            masterService.GetShiftInfo(playload).then(resp => {
                resp.data.body.forEach((item) => {
                    rows_shift.push(item)
                })
                $q.loading.hide()
            })

        }
        ////////////// -Create Shift- //////////////////
        let breaks = reactive([0, 15, 30, 45, 60])
        let dailog_shift = reactive({
            show: false,
            title: null,
            shift_id: null,
            shift_name: null,
            time_start: null,
            time_end: null,
            break: null,
            weekend: null,
            minus_hours: 5,
            cal_type: null,
            cal_price: null,
            cal_default: true,
            weekends: ['วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัส', 'วันศุกร์', 'วันเสาร์', 'วันอาทิตย์'],
            operation: [{ label: 'เงินเดือน', value: 1 }, { label: 'กำหนดเอง(ชั่วโมงละ)', value: 2 }],

        })
        let onCreate_shift = () => {
            v$.value.$reset()
            dailog_shift.show = true
            dailog_shift.title = 'เพิ่ม'
            dailog_shift.shift_id = null
            dailog_shift.shift_name = null
            dailog_shift.time_start = null
            dailog_shift.time_end = null
            dailog_shift.break = null
            dailog_shift.weekend = null
            dailog_shift.minus_hours = 5
            dailog_shift.cal_type = 1
            dailog_shift.cal_price = '/30/8'
            dailog_shift.cal_default = true
        }
        let onEdit_shift = (item) => {
            console.log('ITEM->', item)
            v$.value.$reset()
            dailog_shift.show = true
            dailog_shift.title = 'แก้ไข'
            dailog_shift.shift_id = item.shift_id
            dailog_shift.shift_name = item.shift_name
            dailog_shift.time_start = item.time_start
            dailog_shift.time_end = item.time_end
            dailog_shift.break = item.break
            dailog_shift.weekend = item.weekend == "" ? null : item.weekend.split(",")
            dailog_shift.minus_hours = item.minus_hours
            dailog_shift.cal_type = item.cal_type
            dailog_shift.cal_price = item.cal_price
            dailog_shift.cal_default = item.cal_default == 1 ? true : false
        }
        let onDelete_shift = (item) => {
            $q.loading.show()
            let playload = {
                module: "delete",
                shift_id: item.shift_id
            }
            masterService.GetShiftInfo(playload).then(resp => {
                onSearch_shift()
                $q.loading.hide()
                alerts_confirm.confirm_show = false
                alerts_confirm.row=null
            })
        }
        let onSubmit_shift = () => {
            $q.loading.show()
            let playload = {
                module: dailog_shift.title == 'เพิ่ม' ? 'insert' : 'update',
                shift_id: dailog_shift.shift_id,
                shift_name: dailog_shift.shift_name,
                time_start: dailog_shift.time_start,
                time_end: dailog_shift.time_end,
                break: dailog_shift.break,
                weekend: dailog_shift.weekend.toString(),
                minus_hours: dailog_shift.minus_hours,

                cal_type: dailog_shift.cal_type,
                cal_price: dailog_shift.cal_price,
                cal_default: dailog_shift.cal_default,
            }
            masterService.GetShiftInfo(playload).then(resp => {
                dailog_shift.show = false
                onSearch_shift()
                $q.loading.hide()
            })
        }
        /////////////////////// MGR ////////////////////
        let dailog_shift_mgr = reactive({
            show: false,
            title: null,
            selected: [],
            shift_id: null,
            search: null
        })
        const columns_shift_mgr = [
            { name: 'emp_id', label: 'รหัสพนักงาน', field: 'emp_id', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'fname', label: 'ชื่อ', field: 'fname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'lname', label: 'นามสกุล', field: 'lname', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'dep', label: 'แผนก', field: 'dep', sortable: true, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'active', label: 'Active', field: 'active', sortable: false, headerStyle: { fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
        ]
        let rows_shift_mgr = reactive([])
        let onSearch_shift_mrg = (item) => {
            console.log(item)
            dailog_shift_mgr.show = true
            dailog_shift_mgr.title = item.shift_name
            dailog_shift_mgr.shift_id = item.shift_id
            onLoad_shift_mrg()
        }
        let onLoad_shift_mrg = () => {
            $q.loading.show()
            dailog_shift_mgr.selected = []
            rows_shift_mgr.splice(0)
            let playload = {
                module: "getall",
                shift_id: dailog_shift_mgr.shift_id,
            }
            masterService.GetShift_memberInfo(playload).then(resp => {
                resp.data.body.forEach((item) => {
                    rows_shift_mgr.push({
                        shift_member_id: item.shift_member_id,
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
            dailog_shift_mgr.selected.forEach((i) => {
                arr.push(i.shift_member_id)
            })
            let playload = {
                module: 'delete_member',
                shift_member_id: arr
            }
            masterService.GetShift_memberInfo(playload).then(resp => {
                onLoad_shift_mrg()
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
                module: "get_employee_none_shift",
                // sup_id: dailog_shift_mgr.sup_id,
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
                shift_id: dailog_shift_mgr.shift_id
            }
            masterService.GetShift_memberInfo(playload).then(resp => {
                dailog_emp.show = false
                onLoad_shift_mrg()
                $q.loading.hide()
            })
        }
        const rules = computed(() => {
            return {
                // shift_id: { required },
                shift_name: { required },
                time_start: { required },
                time_end: { required },
                break: { required },
                weekend: { required },
                minus_hours: { required, minValue: minValue(0) },
                cal_price: { required },
            }
        });
        const v$ = useVuelidate(rules, dailog_shift);
        const ValidateForm = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) {
                console.log(v$.value.$errors)
                v$.value.$errors.forEach(i => {
                    if (i.$property == "minus_hours" && i.$params.type == 'minValue') {
                        dailog_shift.minus_hours = 0
                    }
                })
            }
            else {
                console.log(isFormCorrect)
                onSubmit_shift()
            }
        }
        const default_cal = () => {
            if (dailog_shift.cal_default) {
                dailog_shift.cal_type = 1
                dailog_shift.cal_price = '/30/8'
            }
            else {
                dailog_shift.cal_price = null
            }

        }
        const validateInput = computed({
            get() {
                return dailog_shift.cal_price
            },
            set(value) {

                let regex = /^([\+\-\*\/]\d+)+$/;
                if (dailog_shift.cal_type == 2) {
                    regex = /^[0-9]*$/;
                }
                if (regex.test(value)) {
                    dailog_shift.cal_price = value;
                }
                else {
                    console.log('ระบุข้อมูลไม่ถูก');
                }
            }
        });
        onMounted(() => {
            //Check Admin
            let Userlogin = JSON.parse(localStorage.getItem("UserINFO"))
            if (Userlogin.isadmin != 1) {
                router.push("/").then(() => { router.go() })
            }
            ///////////////
            onSearch_shift()
        })

        return {
            alerts_confirm,
            default_cal,
            validateInput,
            /////
            v$,
            rules,
            /////
            onSearch_shift,
            //table//
            columns_shift,
            rows_shift,
            //Create-Shift//
            onCreate_shift,
            breaks,
            dailog_shift,
            onSubmit_shift,
            onEdit_shift,
            onDelete_shift,
            ValidateForm,
            //MGR//
            dailog_shift_mgr,
            onSearch_shift_mrg,
            columns_shift_mgr,
            rows_shift_mgr,
            onLoad_shift_mrg,
            onLoad_shift_mrg,
            onDelete_emp,
            //Emp//
            columns_emp,
            rows_emp,
            onSearch_emp,
            onAdd_emp,
            dailog_emp,
            //pagination
            pagination,
            pagesNumber_1: computed(() => Math.ceil(rows_shift_mgr.length / pagination.value.rowsPerPage)),
            pagesNumber_2: computed(() => Math.ceil(rows_emp.length / pagination.value.rowsPerPage)),
        }
    }
}
</script>

<style ></style>