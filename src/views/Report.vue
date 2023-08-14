<template>
    <div class="row justify-center">
        <div class="general-header col-12 col-md-11">
            <q-card>

                <div class="q-toolbar row no-wrap ">
                    <section class=" cursor-pointer text-subtitle1 " id="example--cards-with-media-content">
                        <div class="card-title text-bold">รายงาน</div>
                    </section>

                </div>

                <div class="q-gutter-md q-pa-md" style="padding-top:0px">
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-3 flex items-center q-px-sm"></div>
                            <div class="col-7 q-px-sm">
                                <q-input label="เลขที่ใบ" v-model="Search.requestNo" :dense="true" color="indigo-10" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-3 flex items-center q-px-sm"></div>
                            <div class="col-7 q-px-sm">
                                <q-select v-model="Search.department" label="แผนก" :dense="true" :options="Dropdown.deps"
                                    emit-value map-options color="indigo-10">
                                </q-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-3 flex items-center q-px-sm"></div>
                            <div class="col-7 q-px-sm">
                                <q-input v-model="Search.employee" label="พนักงาน (รหัส ชื่อ-สกุล)" :dense="true"
                                    color="indigo-10" />
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-3 flex items-center q-px-sm"></div>
                            <div class="col-7 q-px-sm">
                                <q-select v-model="Search.shift" label="กะ" :dense="true" :options="Dropdown.shifts"
                                    emit-value map-options color="indigo-10">
                                </q-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 row">
                        <div class="col-12 col-sm-6 row">
                            <div class="col-3 flex items-center q-px-sm"></div>
                            <div class="col-7 q-px-sm">
                                <q-input v-model="Search.dateLabel" label="วันที่สร้าง" readonly="">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                                                :ref="'Date'">
                                                <q-date v-model="Search.date" range minimal
                                                    @update:model-value="$refs['Date'].hide(), checkValue()">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="ปิด"  color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 row">
                            <div class="col-3 flex items-center q-px-sm"></div>
                            <div class="col-7 q-px-sm">
                                <!-- <q-select label="แผนก" :dense="true" :options="departments"
                                    emit-value map-options color="indigo-10">
                                </q-select> -->

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-center">
                    <div class="q-gutter-md">
                        <q-btn icon="fa-solid fa-magnifying-glass" no-caps class="btn_search" label="ค้นหา"
                            @click="onSearch" />
                        <q-btn icon="fa-solid fa-arrows-rotate" no-caps class="btn_clear text-weight-bolder" @click="onClear" label="ล้าง" />
                        <q-btn icon="fa-solid fa-file-export" no-caps class="btn_excel" @click="onExport" label="ดาวน์โหลด Excel" />

                    </div>
                </div>

                <!-- Table -->
                <div class="q-pa-md ">
                    <q-table :rows="rows" :columns="columns" row-key="dep_id" table-header-class="text-white" :dense="true"
                        wrap-cells v-model:pagination="pagination" hide-pagination color="primary">
                        <template v-slot:body-cell-pdf="props">
                            <q-td :props="props">
                                <q-btn dense @click="onPdf(props.row)" flat size="12px">
                                    <q-icon style="color:#225780;" name="fa-solid fa-file-pdf" />
                                </q-btn>
                            </q-td>
                        </template>
                        <template v-slot:body-cell-view="props">
                            <q-td :props="props">
                                <q-btn dense @click="onOpen(props.row)" flat size="10px">
                                    <q-icon style="color:#0b86d4;" name="fa-solid fa-magnifying-glass" />
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
    </div>
    <Alert :info="alerts_error" @onClose="alerts_error.error_show = false" />
    <Alert :info="alerts_success" @onClose="alerts_success.success_show = false" />
</template>
<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router';
import formService from '../service/form_service.js'
import moment from "moment";
import XLSX from "xlsx-js-style";
export default {

    setup() {
        const router = useRouter()
        const $q = useQuasar()

        const pagination = ref({
            // sortBy: 'dep_id',
            descending: false,
            page: 1,
            rowsPerPage: 10
        })
        const columns = [
            { name: 'pdf', label: 'PDF', field: 'pdf', sortable: false, headerStyle: { width: '5%', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'view', label: 'ดู', field: 'view', sortable: false, headerStyle: { width: '5%', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
            { name: 'requestNo', label: 'เลขที่ใบ', field: 'requestNo', sortable: true, headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'employeeID', label: 'รหัสพนักงาน', field: 'employeeID', sortable: true, headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'employeeName', label: 'ชื่อ สกุล', field: 'employeeName', sortable: true, headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'department', label: 'แผนก', field: 'department', sortable: true, headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'salary', label: 'เงินเดือน', field: 'salary', sortable: true, headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'shift', label: 'กะ', field: 'shift', sortable: true, headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'totalprice_ot', label: 'เบิกโอทีรวม', field: 'totalprice_ot', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
            { name: 'requestDate', label: 'วันที่สร้าง', field: 'requestDate', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        ]

        const rows = reactive([
        ])
        // let model= ref({ from: '2020/07/08', to: '2020/07/17' })
        let Search = reactive({
            requestNo: null,
            employee: null,
            department: null,
            shift: null,
            date: { from: null, to: null },
            dateLabel: null
        })
        let checkValue = () => {
            Search.date == null ? Search.dateLabel = null : Search.dateLabel = moment(Search.date.from).format('DD-MM-yyyy') + " - " + moment(Search.date.to).format('DD-MM-yyyy')

        }
        let Dropdown = reactive({
            deps: [{ value: null, label: 'ทั้งหมด' }],
            shifts: [{ value: null, label: 'ทั้งหมด' }],
        })
        let setDropdown = () => {

            formService.FormData({ module: "GetDepartmentAll" }).then(resp => {
                console.log('DEP->>>', resp)
                resp.data.forEach((i) => {
                    Dropdown.deps.push({
                        value: i.department,
                        label: i.department,
                    })
                })

            })
            formService.FormData({ module: "GetShiftAll" }).then(resp => {
                console.log('SHIP->>>', resp)
                resp.data.forEach((i) => {
                    Dropdown.shifts.push({
                        value: i.shift,
                        label: i.shift,
                    })
                })
            })
        }

        let onSearch = () => {
            $q.loading.show()
            console.log('S->>>>', Search)
            rows.splice(0)
            let playload = {
                module: "GetReqComplete",
                requestNo: Search.requestNo,
                employee: Search.employee,
                department: Search.department,
                shift: Search.shift,
                requestDate_from: Search.date == null ? null : Search.date.from,
                requestDate_to: Search.date == null ? null : Search.date.to

            }
            formService.FormData(playload).then(resp => {
                resp.data.forEach((item) => {
                    // console.log('CHEK->',resp.data)
                    rows.push(
                        {
                            id: item.id,
                            requestNo: item.requestNo,
                            employeeID: item.employeeID,
                            employeeName: item.employeeName,
                            department: item.department,
                            salary: item.salary,
                            shift: item.shift,
                            totalprice_ot:item.totalprice_ot,
                            requestDate: moment(item.requestDate).format('DD-MM-yyyy'),
                        }
                    )
                })
                $q.loading.hide()
            })
        }
        let onClear = () => {
            Search.requestNo = null,
                Search.employee = null,
                Search.department = null,
                Search.shift = null,
                Search.date = { from: null, to: null },
                Search.dateLabel = null
            onSearch()
        }


        let onOpen = (item) => {
            window.open("/overtime/" + btoa(item.id), '_blank')
        }

        let onPdf = (item) => {
            $q.loading.show()
            let playload = {
                module: "GetPdf",
                id: item.id,
            }
            formService.FormData(playload).then(resp => {
                if (resp.data.file) {
                    var Base64 = resp.data.file
                    var link = document.createElement('a');
                    link.download = item.requestNo + '.pdf';
                    link.href = 'data:application/octet-stream;base64,' + Base64;
                    link.click()
                }
                $q.loading.hide()
            })
        }
        async function onExport() {
            $q.loading.show()
            let row = []
            rows.forEach((item,index) => {
                row.push([
                    { v: index+1, s: { alignment: { horizontal: "center" } } },
                    { v: item.requestNo, s: { alignment: { horizontal: "center" } }},
                    { v: item.employeeID, s: { alignment: { horizontal: "center" } }},
                    { v: item.employeeName, },
                    { v: item.department, },
                    { v: item.salary,s: { alignment: { horizontal: "right" } } },
                    { v: item.shift, },
                    { v: item.totalprice_ot,s: { alignment: { horizontal: "right" } } },
                    { v: item.requestDate, s: { alignment: { horizontal: "center" } }},
                ])
            })
            //Replace->null
            row.forEach((i, index1) => {
                i.forEach((itm, index2) => {
                    if (itm.v === null) {
                        row[index1][index2].v = ''
                    }
                })
            })

            let Heading = [
                { v: 'No.', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"} },alignment:{horizontal: "center"}, fill:{fgColor:{rgb:"e91681"}} } },
                { v: 'เลขที่ใบ', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"}  } ,alignment:{horizontal: "center"},fill:{fgColor:{rgb:"e91681"}}}},
                { v: 'รหัสพนักงาน', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"}  },alignment:{horizontal: "center"},fill:{fgColor:{rgb:"e91681"}} } },
                { v: 'ชื่อ สกุล', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"}  },alignment:{horizontal: "center"},fill:{fgColor:{rgb:"e91681"}} } },
                { v: 'แผนก', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"}  },alignment:{horizontal: "center"},fill:{fgColor:{rgb:"e91681"}} } },
                { v: 'เงินเดือน', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"}  } ,alignment:{horizontal: "center"},fill:{fgColor:{rgb:"e91681"}}} },
                { v: 'กะ', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"}  } ,alignment:{horizontal: "center"},fill:{fgColor:{rgb:"e91681"}}} },
                { v: 'เบิกโอทีรวม', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"}  } ,alignment:{horizontal: "center"},fill:{fgColor:{rgb:"e91681"}}} },
                { v: 'วันที่สร้าง', t: "s", s: { font: { bold: true,color:{rgb:"FFFFFF"}  } ,alignment:{horizontal: "center"},fill:{fgColor:{rgb:"e91681"}}} },
                
            ];
            let title = [{ v: 'Report Overtime', t: "s", s: { alignment: { vertical: "center", horizontal: "center" },
            fill:{fgColor:{rgb:"225780"}},font:{bold:true,color:{rgb:"FFFFFF"}} } }];
            let data = [title, Heading]
            row.forEach((i) => {
                data.push(i)
            })

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(data);
            ws['!autofilter'] = { ref: "A2:I2" };
            ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } }];
            ws["!cols"] = [{ width: 10 }, { width: 20 }, { width: 20 },
            { width: 30 }, { width: 15 }, { width: 15 }, { width: 15 },
            { width: 15 },{ width: 30 }];
            XLSX.utils.book_append_sheet(wb, ws, 'SheetO.T.');
            XLSX.writeFile(wb, 'Report_Overtime.xlsx');
            $q.loading.hide()
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
            // setDropdown()
        })
        let dateLabel = ref(Search.date.from + " - " + Search.date.to)

        return {
            Dropdown,
            //Search
            Search,
            dateLabel,
            checkValue,
            // Table

            columns,
            rows,
            //function
            onSearch,
            onClear,


            //action in table
            onOpen,
            onPdf,
            onExport,

            //pagination
            pagination,
            pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage)),
            //

        }
    }
}
</script>

<style></style>