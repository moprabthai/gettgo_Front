<template>
    <div class="row justify-center">
        <div class="general-header col-12 col-md-11">
            <q-card style="padding-bottom:30px">
                <div class="q-toolbar row no-wrap ">
                    <section class=" cursor-pointer text-subtitle1 " id="example--cards-with-media-content">
                        <div class="card-title text-bold">ข้อมูลส่วนตัว</div>
                    </section>
                </div>
                <div class="q-gutter-xs q-pa-md" style="padding-top:0px">
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">เลขที่ใบ :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.requestNo" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">สถานะใบ :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" disable v-model="header.requestStatus" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">วันที่ขอ :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" disable v-model="header.requestDate" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">รหัสพนักงาน :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.employeeID" />
                            </div>
                        </div>

                    </div>
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">ชื่อ สกุล :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.employeeName" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">แผนก :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" disable v-model="header.department" />
                            </div>
                        </div>

                    </div>
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">ผู้อนุมัติ :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.approverName" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">เงินเดือน :</label>

                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.salary" />
                            </div>
                        </div>

                    </div>
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">กะงาน :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.shift" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">เวลาเข้า - ออก
                                    :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.shiftTime" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">เวลาพักก่อนเริ่มโอที
                                    :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.shiftBreak" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-4 flex items-center q-px-sm"><label class="text-bold">วันหยุดประจำสัปดาห์
                                    :</label>
                            </div>
                            <div class="col-7 q-px-sm">
                                <q-input :dense="true" :disable="true" v-model="header.shiftWeekend" />
                            </div>
                        </div>
                    </div>
                </div>
            </q-card>
            <q-card style="margin:30px 0px 30px;padding-bottom: 20px;">
                <div class="q-toolbar row no-wrap ">
                    <section class=" cursor-pointer text-subtitle1 " id="example--cards-with-media-content">
                        <div class="card-title text-bold">รายละเอียดการขอเบิก</div>
                    </section>
                </div>
                <div class="q-gutter-xs q-pa-md" style="padding-top:0px">
                    <q-table :rows="rows_detail" :columns="columns_detail" hide-pagination wrap-cells
                        table-header-class="text-white" v-model:pagination="pagination">

                        <template v-slot:body-cell-time_start="props">
                            <q-td :props="props" class="q-pa-none">
                                <q-input v-model="rows_detail[props.rowIndex].time_start" :outlined="true" :dense="true"
                                    :disable="formInfo.DisibleForm" readonly class="input-detail">
                                    <template v-slot:prepend>
                                        <q-icon name="event" class="cursor-pointer" color="mydrak">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                                                :ref="'DateStart_from_Proxy' + props.rowIndex">
                                                <q-date v-model="rows_detail[props.rowIndex].time_start" color="mydrak"
                                                    mask="DD-MM-YYYY HH:mm" minimal
                                                    @update:model-value="calculate(props.rowIndex), $refs['DateStart_from_Proxy' + props.rowIndex].hide(), SelectDateStart(props.rowIndex)">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="ปิด" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                    <template v-slot:append>
                                        <q-icon name="access_time" class="cursor-pointer" color="mydrak">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                                                ref="TimeStart_from_Proxy">
                                                <q-time v-model="rows_detail[props.rowIndex].time_start" color="mydrak"
                                                    mask="DD-MM-YYYY HH:mm" format24h
                                                    @update:model-value="calculate(props.rowIndex), defaultTimeEnd(props.rowIndex)"
                                                    :minute-options="minuteOptionsTime1"
                                                    :disable="rows_detail[props.rowIndex].time_start">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="ปิด" color="primary" flat />
                                                    </div>
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-time_end="props">
                            <q-td :props="props" class="q-pa-none">
                                <q-input v-model="rows_detail[props.rowIndex].time_end" :outlined="true" :dense="true"
                                    :disable="formInfo.DisibleForm" readonly class="input-detail">
                                    <template v-slot:prepend>
                                        <q-icon name="event" class="cursor-pointer" color="mydrak"
                                            @click="ChangeRow([props.rowIndex])">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                                                :ref="'DateEnd_from_Proxy' + props.rowIndex">
                                                <q-date v-model="rows_detail[props.rowIndex].time_end" color="mydrak"
                                                    mask="DD-MM-YYYY HH:mm" minimal :options="optionsFn"
                                                    @update:model-value="calculate(props.rowIndex), $refs['DateEnd_from_Proxy' + props.rowIndex].hide(), defaultTimeEnd([props.rowIndex])">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="ปิด" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                    <template v-slot:append>
                                        <q-icon name="access_time" class="cursor-pointer" color="mydrak"
                                            @click="ChangeRow([props.rowIndex])">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="rows_detail[props.rowIndex].time_end" color="mydrak"
                                                    mask="DD-MM-YYYY HH:mm" format24h :options="optionsFn2"
                                                    :minute-options="minuteOptionsTime2" @click="TimeEnd(props.rowIndex)"
                                                    @update:model-value="calculate(props.rowIndex), TimeEnd(props.rowIndex)"
                                                    :disable="rows_detail[props.rowIndex].time_end">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="ปิด" color="primary" flat />
                                                    </div>
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-type="props">
                            <q-td :props="props" class="q-pa-none">
                                <q-select outlined :dense="true" :options="options.types" emit-value map-options
                                    :disable="formInfo.DisibleForm" v-model="rows_detail[props.rowIndex].type"
                                    class="input-detail" @update:model-value="calculate(props.rowIndex)">
                                </q-select>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-price_of_hours="props">
                            <q-td :props="props" class="q-pa-none">
                                <q-input v-model="rows_detail[props.rowIndex].price_of_hours" :dense="true"
                                    class="input-detail" :disable="true" :outlined="true"></q-input>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-total_hours="props">
                            <q-td :props="props" class="q-pa-none">
                                <q-input v-model="rows_detail[props.rowIndex].total_hours" :dense="true" :disable="true"
                                    class="input-detail" :outlined="true"
                                    @update:model-value="calculate(props.rowIndex)"></q-input>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-total_price="props">
                            <q-td :props="props" class="q-pa-none">
                                <q-input v-model="rows_detail[props.rowIndex].total_price" :dense="true" :disable="true"
                                    class="input-detail" :outlined="true"></q-input>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-comment="props">
                            <q-td :props="props" class="q-pa-none" style="padding-top:24px">
                                <q-input v-model="rows_detail[props.rowIndex].comment" :dense="true"
                                    :disable="formInfo.DisibleForm"
                                    :error="rows_detail[props.rowIndex].note && (rows_detail[props.rowIndex].comment == null || rows_detail[props.rowIndex].comment == '')"
                                    :error-message="'เวลาของคุณอยู่ในเวลาทำงาน กรุณาระบุ หมายเหตุ'" class="input-detail"
                                    :outlined="true"></q-input>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-add_delete="props">
                            <q-td :props="props">
                                <q-btn dense color="indigo-7" class="text-bolder" :size="'xs'"
                                    :disable="formInfo.DisibleForm" @click="onAdd_rowDetail()">
                                    <i class="q-icon notranslate material-icons" aria-hidden="true" role="img">add</i>
                                </q-btn>
                                <q-btn dense color="amber-8" class="q-ml-xs text-weight-bolder" :size="'xs'"
                                    :disable="props.rowIndex == 0 || formInfo.DisibleForm"
                                    @click="onRemove_rowDetail(props.rowIndex)">
                                    <i class="q-icon notranslate material-icons" aria-hidden="true" role="img">remove</i>
                                </q-btn>
                            </q-td>
                        </template>
                        <template v-slot:bottom-row>
                            <q-tr>
                                <q-td colspan="6" style="text-align: right;" class="buttom_table text-bold">
                                    ยอดรวม :
                                </q-td>
                                <q-td class="buttom_table text-bold">
                                    {{ total_detail.price }}
                                </q-td>
                                <q-td class="buttom_table text-bold">
                                    บาท
                                </q-td>
                                <q-td class="buttom_table text-bold">

                                </q-td>

                            </q-tr>
                        </template>
                    </q-table>
                </div>
                <div class="col-12 row">
                    <div class="col-12 col-sm-6 row">
                        <div class="col-2.5 flex q-px-md"><label class="text-bold">หมายเหตุ :</label>
                        </div>
                        <div class="col-8 q-px-md">
                            <q-input :dense="true" outlined :disable="comment.disible" maxlength="200"
                                v-model="comment.comment" type="textarea" rows="2"
                                :error="comment.comment == '' && comment.error"
                                :error-message="'กรุณาระบุ หมายเหตุ กรณี ส่งกลับ หรือ ยกเลิก'" />
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 row">
                        <div class="col-10 q-px-md" v-show="admin.show">
                            <q-select label="Admin" v-model="admin.admin" :dense="true" :options="admin.admins"
                                option-value="emp_id" option-label="fullname" :error="admin.error && admin.admin == null"
                                :error-message="'กรุณาเลือก ผู้ดูแลระบบ ที่จะส่งต่อ'" map-options color="indigo-10">
                            </q-select>

                        </div>
                    </div>
                </div>
                <div class="row justify-center" style="padding:20px">
                    <div class="q-gutter-md" v-show="formInfo.Button == 1">
                        <q-btn icon="fa-solid fa-cloud" no-caps class="btn_search" label="บันทึกร่าง"
                            @click="saveDraft()" />
                        <q-btn icon="fa-solid fa-play" no-caps class="btn_add text-weight-bolder" @click="submitForm()"
                            label="ส่งคำขอ" />
                        <q-btn v-show="formInfo.BTNCancle" icon="fa-solid fa-ban" no-caps
                            class="btn_clear text-weight-bolder" label="ลบ" @click="onConfirmDelete()" />
                    </div>
                    <div class="q-gutter-md" v-show="formInfo.Button == 2">
                        <q-btn icon="fa-solid fa-rotate-left" no-caps color="negative" label="ส่งกลับ" @click="onReturn()" />
                        <q-btn icon="fa-solid fa-circle-check" no-caps color="positive" @click="onApprove()"
                            label="อนุมัติ" />
                        <q-btn icon="fa-solid fa-ban" no-caps class="btn_clear text-weight-bolder" label="ยกเลิก"
                            @click="onCancle()" />
                    </div>
                    <div class="q-gutter-md" v-show="formInfo.Button == 3">

                        <q-btn icon="fa-solid fa-file-pdf" no-caps round outline color="red-8" @click="pdf()" />
                    </div>
                </div>
            </q-card>
            <q-card style="margin:30px 0px 30px;padding-bottom: 20px;" v-show="formInfo.requestStatus_No >= 1">
                <div class="q-toolbar row no-wrap ">
                    <section class=" cursor-pointer text-subtitle1 " id="example--cards-with-media-content">
                        <div class="card-title ">ประวัติ</div>
                    </section>
                </div>
                <div class="q-gutter-xs q-pa-md" style="padding-top:0px">
                    <q-table :rows="rows_history" :columns="columns_history" hide-pagination wrap-cells dense
                        separator="cell" table-header-class="text-white" v-model:pagination="pagination">
                        <template v-slot:body-cell-action_by="props">
                            <q-td :props="props">
                                <q-chip class="ellipsis" color="pink-1" text-color="black" style="width:100%">
                                    <q-avatar size="26px">
                                        <img :src="props.row.img">
                                    </q-avatar>
                                    {{ props.row.empinfo.fname + " " + props.row.empinfo.lname }}
                                </q-chip>
                            </q-td>
                        </template>
                    </q-table>
                </div>

            </q-card>
        </div>
    </div>
    <Alert :info="alerts_confirm" @onConfirm="onDelete()" @onClose="alerts_confirm.confirm_show = false" />
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue-demi'
import moment from "moment";
import masterService from '../service/master_service.js'
import formService from '../service/form_service.js'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import Alert from '../components/Alert.vue'
export default {
    components: {
        Alert
    },
    setup() {
        const $q = useQuasar()
        const router = useRouter()
        ////////////// Dialog /////////////
        let alerts_confirm = reactive({
            confirm_show: false,
            status: '',
            message: '',
            id: ''
        })

        //////////////// Form INFO ////////////
        let formInfo = reactive({
            id: null,
            DisibleForm: false,
            Button: 1,
            BTNCancle: false,
            requestStatus_No: null,

        })
        ///////////////// Comment /////////////
        let comment = reactive({
            comment: '',
            error: false,
            disible: false,
        })
        //////////////// Header //////////////
        let header = reactive({
            requestNo: null,
            requestStatus: null,
            requestDate: null,
            employeeID: null,
            department: null,
            employeeName: null,
            approverName: null,
            approverID: null,
            salary: null,
            price_of_hours: null,
            shift: null,
            shiftTime: null,
            shiftBreak: null,
            shiftWeekend: null,
            shiftMinus_hours: null
        })
        //////////////// Shift ////////////
        let shift_data = reactive()
        //////////////// Detail //////////////

        let options = reactive({
            types: [
                { value: 1, label: '1 แรง' },
                { value: 1.5, label: '1.5 แรง' },
                { value: 2, label: '2 แรง' },
                { value: 3, label: '3 แรง' },
            ]

        })
        let rows_detail = reactive([{
            no: 1,
            time_start: null,
            time_end: null,
            type: 1,
            price_of_hours: '',
            total_hours: 0,
            total_price: 0,
            comment: null,
            note: false,
        }])
        let total_detail = reactive({
            price: 0
        })
        let onAdd_rowDetail = () => {
            rows_detail.push({
                no: rows_detail.length + 1,
                time_start: null,
                time_end: null,
                type: 1,
                price_of_hours: header.price_of_hours,
                total_hours: 0,
                total_price: 0,
                comment: null,
                note: false,
            })
        }
        let onRemove_rowDetail = (index) => {
            rows_detail.splice(index, 1)
            rows_detail.forEach((i, index) => {
                rows_detail[index].no = index + 1
            })
        }
        let calculate = (index) => {
            rows_detail[index].price_of_hours = header.price_of_hours * rows_detail[index].type
            let time_start = rows_detail[index].time_start
            let time_end = rows_detail[index].time_end

            let ms = moment(time_end, "DD/MM/YYYY HH:mm:ss").diff(moment(time_start, "DD/MM/YYYY HH:mm:ss"));
            let total_time = moment.duration(ms);
            if (!isNaN(total_time)) {
                let totalTime = parseFloat(total_time.asHours()).toFixed(2)
                if (totalTime > shift_data.shiftMinus_hours) {
                    totalTime = totalTime - 1
                }
                let totalPrice = parseFloat(totalTime * rows_detail[index].price_of_hours).toFixed(2)
                rows_detail[index].total_hours = parseFloat(totalTime).toFixed(2)
                rows_detail[index].total_price = parseFloat(totalPrice).toFixed(2)

                // total_detail.price = 
                let sum = 0
                rows_detail.forEach((i) => {
                    sum = sum + parseFloat(i.total_price)
                    total_detail.price = parseFloat(sum).toFixed(2)
                })
            }
        }
        ////////////////////////// Admin ///////////////////////////
        let admin = reactive({
            admin: null,
            admins: [],
            show: false,
            error: false
        })
        let getadmin = () => {
            let playload = {
                module: 'getadmin'
            }
            masterService.GetEmpInfo(playload).then(resp => {
                resp.data.body.forEach((i) => {
                    admin.admins.push({
                        emp_id: i.emp_id,
                        fullname: "(" + i.emp_id + ") " + i.fname + " " + i.lname,
                        name: i.fname + " " + i.lname
                    })
                })
            })
        }

        ////////////////////////////////////////////////////////////
        ///////////////////////// Submit ///////////////////////////

        let RowDateStart = null
        let minOptionEnd = reactive([0, 15, 30, 45])
        let ChangeRow = (index) => {
            RowDateStart = index
        }
        let SelectDateStart = (index) => {
            rows_detail[index].time_end = rows_detail[index].time_start
        }
        let defaultTimeEnd = (index) => {
            let date = moment(rows_detail[index].time_end, "DD/MM/YYYY HH:mm:ss").format('DD-MM-YYYY')
            let time = moment(rows_detail[index].time_start, "DD/MM/YYYY HH:mm:ss").format('HH:mm')
            let sum = date + ' ' + time
            if (rows_detail[index].time_end) {
                rows_detail[index].time_end = sum
                console.log('Check2->>>>', typeof rows_detail[index].time_end)

            }
            calculate(index)
        }
        let DateStart = () => {
            let startDate = moment(rows_detail[RowDateStart].time_start, "DD/MM/YYYY HH:mm:ss").format('YYYY/MM/DD')
            return startDate
        }
        let TimeStart = () => {
            let startTime = moment(rows_detail[RowDateStart].time_start, "DD/MM/YYYY HH:mm:ss").format('HH')
            let startDate = moment(rows_detail[RowDateStart].time_start, "DD/MM/YYYY HH:mm:ss").format('YYYY/MM/DD')
            let endDate = moment(rows_detail[RowDateStart].time_end, "DD/MM/YYYY HH:mm:ss").format('YYYY/MM/DD')

            if (startDate == endDate) {

                return startTime
            }
            else {
                return -1
            }

        }
        let TimeEnd = (row_index) => {
            minOptionEnd.splice(0)
            minOptionEnd.push(0, 15, 30, 45)
            let startTime = moment(rows_detail[row_index].time_start, "DD/MM/YYYY HH:mm:ss").format('DD/MM/YYYY HH')
            let endTime = moment(rows_detail[row_index].time_end, "DD/MM/YYYY HH:mm:ss").format('DD/MM/YYYY HH')
            if (startTime == endTime) {
                let startMin = moment(rows_detail[row_index].time_start, "DD/MM/YYYY HH:mm:ss").format('mm')
                for (let i = 0; i < 4; i++) {
                    startMin = parseInt(startMin) - 15
                    minOptionEnd.forEach((item, index) => {
                        if (startMin == item) {
                            minOptionEnd.splice(index, 1);
                            console.log('YY-2->', minOptionEnd)
                        }
                    })
                }
            }
            else {
                minOptionEnd.splice(0)
                minOptionEnd.push(0, 15, 30, 45)
            }
        }
        //////////////////////////////////////////////////////////////////
        ///////////////////// MAP Data////////////////////////////////
        let SendData = (module_) => {
            let playload = {
                id: formInfo.id,
                module: module_,
                body: {
                    header: header,
                    total: total_detail,
                    detail: rows_detail,
                },
                action_by: sessionStorage.getItem("SessionEmpID"),
                comment: comment.comment
            }
            return playload
        }
        /////////////////////////////////////////////////////////////
        ////////////////////////// SaveDarft ///////////////////////
        let saveDraft = () => {
            $q.loading.show()
            formService.FormData(SendData("Savedraft")).then(resp => {
                if (resp.data.status) {
                    trigger('positive', 'บันทึกร่างสำเร็จ')
                    setTimeout(() => {
                        router.push("/overtime/" + btoa(resp.data.Request_id)).then(() => { router.go() })
                    }, 2000)
                }

            })
        }
        ////////////////////////// Submit ///////////////////////////
        const submitForm = async () => {
            $q.loading.show()
            if (CheckComment() == 'Time') {
                trigger('negative', 'กรุณาใส่ รายละเอียดให้ครบทุกแถว')
                $q.loading.hide()
            }
            else if (CheckComment() == 'Note') {
                trigger('negative', 'กรุณาระบุหมายเหตุ')
                $q.loading.hide()
            }
            else {
                formService.FormData(SendData("Submit")).then(resp => {
                    if (resp.data.status) {
                        trigger('positive', 'ส่งคำขอสำเร็จ')
                        setTimeout(() => {
                            router.push("/").then(() => { router.go() })
                        }, 2000)
                    }
                })
            }
        }
        /////////////////////////// Approve //////////////////////////
        const onApprove = async () => {
            $q.loading.show()
            let playload = {
                id: formInfo.id,
                module: '',
                admin: null,
                admin_name: null,
                request_no: header.requestNo,
                action_by: sessionStorage.getItem("SessionEmpID"),
                comment: comment.comment
            }
            switch (formInfo.requestStatus_No) {
                case 1:
                    if (admin.admin == null) {
                        admin.error = true
                    }
                    else {
                        admin.error = false
                        playload.module = 'ApproveBySub'
                        playload.admin = admin.admin.emp_id
                        playload.admin_name = admin.admin.name
                    }

                    break;
                case 2:
                    playload.module = 'ApproveByAdmin'
                    break;
            }
            if (admin.error) {
                $q.loading.hide()
            }
            else {
                formService.FormData(playload).then(resp => {
                    if (resp.data.status) {
                        trigger('positive', 'อนุมัติสำเร็จ')
                        setTimeout(() => {
                            router.push("/").then(() => { router.go() })
                        }, 2000)
                    }
                })
            }

        }
        const onReturn = async () => {
            $q.loading.show()
            let playload = {
                id: formInfo.id,
                module: '',
                request_no: header.requestNo,
                action_by: sessionStorage.getItem("SessionEmpID"),
                comment: comment.comment
            }
            switch (formInfo.requestStatus_No) {
                case 1:
                    playload.module = 'ReturnBySub'
                    break;
                case 2:
                    playload.module = 'ReturnByAdmin'
                    break;
            }
            if (comment.comment == '') {
                comment.error = true
                $q.loading.hide()
            }
            else {
                formService.FormData(playload).then(resp => {
                    if (resp.data.status) {
                        trigger('positive', 'ส่งกลับสำเร็จ')
                        setTimeout(() => {
                            router.push("/").then(() => { router.go() })
                        }, 2000)
                    }
                })
            }
        }
        let onCancle = () => {
            $q.loading.show()
            let playload = {
                id: formInfo.id,
                module: '',
                request_no: header.requestNo,
                action_by: sessionStorage.getItem("SessionEmpID"),
                comment: comment.comment
            }
            switch (formInfo.requestStatus_No) {
                case 1:
                    playload.module = 'CancelBySub'
                    break;
                case 2:
                    playload.module = 'CancelByAdmin'
                    break;
            }
            if (comment.comment == '') {
                comment.error = true
                $q.loading.hide()
            }
            else {
                formService.FormData(playload).then(resp => {
                    if (resp.data.status) {
                        trigger('positive', 'ยกเลิกสำเร็จ')
                        setTimeout(() => {
                            router.push("/").then(() => { router.go() })
                        }, 2000)
                    }
                })
            }

        }
        /////////////////////////// validate /////////////////////////
        let CheckComment = () => {
            console.log('>>>>>>>>>>>>>-<<<<<<<<<<<')
            let MapDate = (item) => {
                const data = [
                    { th: 'วันจันทร์', en: 'Mon' },
                    { th: 'วันอังคาร', en: 'Tue' },
                    { th: 'วันพุธ', en: 'Wen' },
                    { th: 'วันพฤหัส', en: 'Thu' },
                    { th: 'วันศุกร์', en: 'Fri' },
                    { th: 'วันเสาร์', en: 'Sat' },
                    { th: 'วันอาทิตย์', en: 'Sun' },
                ]
                const emitdata = data.filter((i) => {
                    return item == i.th
                })
                return emitdata[0].en
            }
            //Shift Data
            let shift_weekend = shift_data.weekend.split(',');
            let shift_time_start = shift_data.time_start
            let shift_time_end = shift_data.time_end
            let shift_break = shift_data.break
            //Requset Data
            rows_detail.forEach((i, index) => {
                let dayStart = moment(rows_detail[index].time_start, "DD/MM/YYYY HH:mm:ss").format('ddd')
                let dayEnd = moment(rows_detail[index].time_end, "DD/MM/YYYY HH:mm:ss").format('ddd')

                let timeStart = moment(rows_detail[index].time_start, "DD/MM/YYYY HH:mm:ss").format('HH:mm')
                let timeEnd = moment(rows_detail[index].time_end, "DD/MM/YYYY HH:mm:ss").format('HH:mm')

                let Checkweekend = shift_weekend.filter((i) => {
                    return MapDate(i) == dayStart || MapDate(i) == dayEnd
                })
                console.log('Weekend->Checkweekend', Checkweekend)
                if (Checkweekend.length == 0) {
                    var format = 'HH:mm'
                    var time1 = moment(timeStart, format)
                    var time2 = moment(timeEnd, format)
                    var beforeTime = moment(shift_time_start, format)
                    var afterTime = moment(moment(shift_time_end, format).add(parseInt(shift_break), 'minutes').format('HH:mm'), format);
                    if (time1.isBetween(beforeTime, afterTime, undefined, '[)')) {
                        rows_detail[index].note = true
                    }
                    else if (time2.isBetween(beforeTime, afterTime)) {
                        rows_detail[index].note = true
                    }
                    else {
                        rows_detail[index].note = false
                    }
                }
                else {
                    rows_detail[index].note = false
                }
            })
            let CheckNote = rows_detail.filter((i) => {
                return i.note == true && (i.comment == null || i.comment == '')
            })
            let CheckTime = rows_detail.filter((i) => {
                return i.time_start == null || i.time_start == '' || i.time_end == null || i.time_end == ''
            })

            if (CheckTime.length != 0) {
                return 'Time'
            }
            else if (CheckNote.length != 0) {
                return 'Note'
            }
            else {
                return false
            }

        }
        ////////////////////////////// Delete /////////////////////////////
        let onConfirmDelete = () => {
            alerts_confirm.message = 'คุณแน่ใจต้องการที่จะลบคำขอ'
            alerts_confirm.confirm_show = true
            alerts_confirm.id = formInfo.id
        }
        let onDelete = () => {
            $q.loading.show()
            alerts_confirm.confirm_show = false
            let playload = {
                module: "Delete",
                id: alerts_confirm.id,
            }
            formService.FormData(playload).then(resp => {
                console.log(resp.data.status)
                if (resp.data.status) {
                    trigger('positive', 'ลบสำเร็จ')
                    setTimeout(() => {
                        $q.loading.hide()
                        router.push("/").then(() => { router.go() })
                    }, 2000)

                }

            })
        }
        ///////////////////////////////////// Load Data /////////////////////////
        let onloadNewRequest = () => {
            $q.loading.show()
            let Userlogin = JSON.parse(localStorage.getItem("UserINFO"))
            /// DataForm UserLOGIN
            header.requestNo = null
            header.requestDate = moment(new Date()).format("DD/MM/YYYY")
            header.employeeID = Userlogin.emp_id
            header.department = Userlogin.department.dep_name
            header.employeeName = Userlogin.fname + ' ' + Userlogin.lname
            header.salary = Userlogin.salary



            let playload = {
                module: "getByEmp",
                emp_id: Userlogin.emp_id,
            }
            //Get Shift
            masterService.GetShift_memberInfo(playload).then(resp => {
                if (resp.data.body.length != 0) {
                    console.log('SHIF-RESP->>>>', resp.data.body)
                    shift_data = {
                        break: resp.data.body[0].shift.break,
                        shift_name: resp.data.body[0].shift.shift_name,
                        time_end: resp.data.body[0].shift.time_end,
                        time_start: resp.data.body[0].shift.time_start,
                        weekend: resp.data.body[0].shift.weekend,
                        shiftMinus_hours: resp.data.body[0].shift.minus_hours,
                        cal_type: resp.data.body[0].shift.cal_type,
                        cal_price: resp.data.body[0].shift.cal_price,
                    }
                    header.shift = resp.data.body[0].shift.shift_name
                    header.shiftTime = resp.data.body[0].shift.time_start + " - " + resp.data.body[0].shift.time_end
                    header.shiftBreak = resp.data.body[0].shift.break + " นาที"
                    header.shiftWeekend = resp.data.body[0].shift.weekend
                    header.shiftMinus_hours = resp.data.body[0].shift.minus_hours
                    switch (shift_data.cal_type) {
                        case 1:
                            rows_detail[0].price_of_hours = eval(Userlogin.salary + (shift_data.cal_price))
                            header.price_of_hours = eval(Userlogin.salary + (shift_data.cal_price))
                            break;
                        case 2:
                            rows_detail[0].price_of_hours = shift_data.cal_price
                            header.price_of_hours = shift_data.cal_price
                            break;
                    }
                }
                else {
                    formInfo.DisibleForm = true
                    formInfo.Button = 0
                    comment.disible = true
                    trigger('negative', 'คุณไม่สามารถสร้างใบได้ เนื่องจากคุณยังไม่ได้เพิ่มกะ')
                    setTimeout(() => {

                        router.push("/").then(() => { router.go() })
                    }, 5000)
                }
            })
            //Get Apporver
            masterService.GetCommandInfo(playload).then(resp => {

                if (resp.data.body.length != 0) {
                    header.approverName = resp.data.body[0].approver.employee.fname + " " + resp.data.body[0].approver.employee.lname
                    header.approverID = resp.data.body[0].approver.employee.emp_id

                }
                else {

                    formInfo.DisibleForm = true
                    formInfo.Button = 0
                    comment.disible = true
                    trigger('negative', 'คุณไม่สามารถสร้างใบได้ เนื่องจากคุณยังไม่ได้เพิ่มผู้บังคับบัญชา')
                    setTimeout(() => {
                        router.push("/").then(() => { router.go() })
                    }, 5000)
                }

            })
            setTimeout(() => {
                $q.loading.hide()
            }, 5000)

        }
        let onloadGetRequstByID = (id) => {
            $q.loading.show()
            let playload = {
                module: "GetByID",
                id: formInfo.id,
            }
            formService.FormData(playload).then(resp => {
                let data = resp.data.body[0]

                Object.assign(header, data.Header)
                Object.assign(rows_detail, data.Detail)
                Object.assign(total_detail, data.total)
                formInfo.requestStatus_No = data.Header.requestStatus_No
                //Shift
                shift_data = {
                    break: (data.Header.shiftBreak.split(" "))[0],
                    shift_name: data.Header.shift,
                    time_start: (data.Header.shiftTime.split(" - "))[0],
                    time_end: (data.Header.shiftTime.split(" - "))[1],
                    weekend: data.Header.shiftWeekend,
                    shiftMinus_hours: data.Header.shiftMinus_hours
                }

                // SetPermission //
                if (sessionStorage.getItem("SessionEmpID") == data.Header.assignTo)
                // || (sessionStorage.getItem("SessionIsAdmin") == '1' && data.Header.assignTo == "admin"))
                {

                    if (data.Header.requestStatus_No == 1 || data.Header.requestStatus_No == 2 || data.Header.requestStatus_No == 3) {
                        formInfo.DisibleForm = true
                        formInfo.Button = 2

                        if (data.Header.requestStatus_No == 1) {
                            admin.show = true
                            getadmin()
                        }
                    }
                    else if (data.Header.requestStatus_No == 6) {
                        console.log('DATA', sessionStorage.getItem("SessionEmpID"), data.Header.assignTo)
                        formInfo.DisibleForm = false
                        formInfo.Button = 1
                    }
                }
                else {
                    if (sessionStorage.getItem("SessionEmpID") == data.Header.employeeID || sessionStorage.getItem("SessionIsAdmin") == '1') {
                        comment.disible = true
                        formInfo.DisibleForm = true
                        formInfo.Button = 0
                        if (data.Header.requestStatus_No == 3) {
                            //PDF
                            formInfo.Button = 3
                        }
                    }
                    else {
                        router.push("/").then(() => { router.go() })
                    }
                }

                $q.loading.hide()
            })
        }
        //////////////////// PDF /////////////////////////////
        let pdf = () => {
            $q.loading.show()
            let playload = {
                module: "GetPdf",
                id: formInfo.id,
            }
            formService.FormData(playload).then(resp => {
                if (resp.data.file) {
                    var Base64 = resp.data.file
                    var link = document.createElement('a');
                    link.download = header.requestNo + '.pdf';
                    link.href = 'data:application/octet-stream;base64,' + Base64;
                    link.click()
                }
                $q.loading.hide()
            })
        }
        //////////////////// notify //////////////////////////
        let trigger = (type, message) => {
            $q.notify({
                type: type,
                message: message,
                position: 'top',
                timeout: 4000
            })
        }
        //////////////////// History //////////////////////////
        let rows_history = reactive([])
        let onloadHistory = () => {
            let playload = {
                module: 'getall',
                id: formInfo.id,
            }
            formService.GetHistory(playload).then(resp => {
                resp.data.body.forEach((i, index) => {
                    rows_history.push({
                        no: index + 1,
                        action_by: i.action_by,
                        requestStatus: i.requestStatus,
                        updated_at: moment(i.updated_at).format('DD/mm/yyyy HH:mm'),
                        comment: i.comment,
                        img: "https://cdn.quasar.dev/img/boy-avatar.png",
                        empinfo: i.empinfo
                    })
                })
                rows_history.forEach((i, index) => {
                    let playload = {
                        module: "getImage",
                        emp_id: i.action_by
                    }
                    masterService.GetProfile_picture(playload).then(resp => {
                        if (resp.data.status) {
                            rows_history[index].img = resp.data.url
                        }
                    })
                })
            })
        }

        //////////////////////////////////////////////////////////////
        onMounted(() => {
            if (useRoute().params.id) {
                console.log('>>>>>>>>>>>>>', atob(useRoute().params.id))
                formInfo.id = atob(useRoute().params.id)
                onloadGetRequstByID()
                formInfo.BTNCancle = true
                onloadHistory()
            }
            else {
                onloadNewRequest()

            }
        })
        return {
            formInfo,
            comment,
            ////////////////Header ///////////////
            header,
            shift_data,
            //////////////// Detail //////////////
            SelectDateStart,
            ChangeRow,
            defaultTimeEnd,
            DateStart,
            TimeStart,
            TimeEnd,
            options,
            rows_detail,
            total_detail,
            calculate,
            minOptionEnd,
            //////////////// Admin /////////////////
            admin,
            getadmin,
            /////////////// Action /////////////////
            saveDraft,
            submitForm,
            onConfirmDelete,
            onDelete,
            //////////////// Alert //////////////////
            alerts_confirm,
            optionsFn(date) {
                return date >= DateStart() && date <= moment(DateStart(), 'YYYY/MM/DD').add(1, 'days').format('YYYY/MM/DD')
            },
            optionsFn2(hr) {
                return hr >= TimeStart()
            },
            minuteOptionsTime1: [0, 15, 30, 45],
            minuteOptionsTime2: minOptionEnd,
            pagination: ref({
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 0
            }),
            columns_detail: [
                { label: 'ลำดับ', field: 'no', name: 'no', align: 'center', headerStyle: { width: '1px', maxWidth: '1px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '1px', maxWidth: '1px', fontSize: '0.9rem', textAlign: 'center', } },
                { label: 'เวลาเริ่ม', field: 'time_start', name: 'time_start', headerStyle: { width: '110px', maxWidth: '110px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '110px', maxWidth: '110px', padding: '3px' } },
                { label: 'เวลาออก', field: 'time_end', name: 'time_end', headerStyle: { width: '110px', maxWidth: '110px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '110px', maxWidth: '110px', padding: '3px' } },
                { label: 'ประเภท', field: 'type', name: 'type', headerStyle: { width: '60px', maxWidth: '60px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '60px', maxWidth: '60px', fontSize: '13px', padding: '3px' } },
                { label: 'ราคาต่อชั่วโมง', field: 'price_of_hours', name: 'price_of_hours', headerStyle: { width: '50px', maxWidth: '50px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '50px', maxWidth: '50px', fontSize: '13px', padding: '3px' } },
                { label: 'จำนวนชั่วโมง', field: 'total_hours', name: 'total_hours', headerStyle: { width: '30px', maxWidth: '30px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '30px', maxWidth: '30px', fontSize: '13px', padding: '3px' } },
                { label: 'ราคาทั้งหมด', field: 'total_price', name: 'total_price', headerStyle: { width: '50px', maxWidth: '50px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '50px', maxWidth: '50px', fontSize: '13px', padding: '3px' } },
                { label: 'หมายเหตุ', field: 'comment', name: 'comment', headerStyle: { width: '150px', maxWidth: '150px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '150px', maxWidth: '150px', fontSize: '13px', padding: '3px' } },
                { label: 'เพิ่ม ลบ', field: 'add_delete', name: 'add_delete', headerStyle: { width: '50px', maxWidth: '50px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { width: '50px', maxWidth: '50px', fontSize: '13px', textAlign: 'center' } },
            ],
            onAdd_rowDetail,
            onRemove_rowDetail,
            //////////// Action /////////////
            CheckComment,
            onApprove,
            onReturn,
            onCancle,
            pdf,
            //////////// LoadData ///////////
            onloadNewRequest,
            onloadGetRequstByID,
            ///////////// Notify ////////////
            trigger,
            //////////// History ////////////
            onloadHistory,
            rows_history,
            columns_history: [
                { label: 'No.', field: 'no', name: 'no', align: 'center', headerStyle: { minWidth: '1px', maxWidth: '1px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { minWidth: '1px', maxWidth: '1px', fontSize: '0.9rem', textAlign: 'center', } },
                { label: 'ผู้ดำเนินการ', field: 'action_by', name: 'action_by', headerStyle: { minWidth: '80px', maxWidth: '80px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { minWidth: '80px', maxWidth: '80px', textAlign: 'left' } },
                { label: 'สถานะ', field: 'requestStatus', name: 'requestStatus', headerStyle: { minWidth: '80px', maxWidth: '80px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { minWidth: '80px', maxWidth: '80px', textAlign: 'left' } },
                { label: 'วัน & เวลา', field: 'updated_at', name: 'updated_at', headerStyle: { minWidth: '50px', maxWidth: '50px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { minWidth: '50px', maxWidth: '50px', textAlign: 'center' } },
                { label: 'หมายเหตุ', field: 'comment', name: 'comment', headerStyle: { minWidth: '150px', maxWidth: '150px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { minWidth: '150px', maxWidth: '150px', textAlign: 'left' } },
            ]

        }
    }
}



</script>

<style scoped>
.input-detail {
    font-size: 0.8rem;
}
</style>

