<template>
  <div class="row justify-center">
    <div class="general-header col-12 col-md-11">
      <q-card style="padding-bottom:0px;">
        <q-tabs v-model="tab" align="justify" no-caps class="text-bold">
          <q-tab name="TODO" @click="onload_TODO">
            <q-icon style="marginTop:10px;color:#335e80;" name="fa-solid fa-clipboard" />
            <span style="marginTop:5px;color:#335e80;">ที่ต้องทำ</span>
          </q-tab>
          <q-tab name="MyRequest" @click="onload_MyRequest" >
            <q-icon style="marginTop:10px;color:#335e80;" name="fa-solid fa-list-ul" />
            <span style="marginTop:5px;color:#335e80;">คำขอของฉัน</span>
          </q-tab>
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated class="">
          <q-tab-panel name="TODO">
            <q-table :rows="rows_TODO" :columns="columns_todo" row-key="name" table-header-class="text-white" dense
              color="primary" :filter="filter" :rows-per-page-options="[0]" hide-pagination  >
              <template v-slot:body-cell-view="props">
                <q-td :props="props">
                  <q-btn dense @click="onOpen(props.row)" flat size="10px">
                    <q-icon style="color:#0b86d4;" name="fa-solid fa-magnifying-glass" />
                  </q-btn>
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <div v-show="props.row.requestStatus_No == 0"><q-badge color="indigo">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 6"><q-badge color="yellow-8">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 1"><q-badge color="blue-6">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 2"><q-badge color="blue-6">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 3"><q-badge color="green-6">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 9"><q-badge color="negative">{{ props.row.status }}</q-badge>
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-createBy="props">
                <q-td :props="props">
                  <q-chip class="ellipsis" color="blue-2" text-color="black" style="width:100%">
                    <q-avatar size="26px">
                      <img :src="props.row.img">
                    </q-avatar>
                    {{ props.row.createBy }}
                  </q-chip>
                </q-td>
              </template>
              <template v-slot:body-cell-del="props">
                <q-td :props="props">
                  <q-btn dense @click="onConfirmDelete(props.row)" v-show="props.row.requestStatus_No == 0" flat
                    size="10px">
                    <q-icon color="red-7" name="fa-solid fa-trash" />
                  </q-btn>
                </q-td>
              </template>
            </q-table>

          </q-tab-panel>

          <q-tab-panel name="MyRequest" class="">
            <q-table :rows="rows_MyRequest" :columns="columns_myrequest" row-key="name" table-header-class="text-white" dense
              color="primary" :filter="filter" :rows-per-page-options="[0]" hide-pagination >
              <template v-slot:body-cell-view="props">
                <q-td :props="props">
                  <q-btn dense @click="onOpen(props.row)" flat size="10px">
                    <q-icon style="color:#0b86d4;" name="fa-solid fa-magnifying-glass" />
                  </q-btn>
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <div v-show="props.row.requestStatus_No == 0"><q-badge color="indigo">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 6"><q-badge color="yellow-8">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 1"><q-badge color="blue-6">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 2"><q-badge color="blue-6">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 3"><q-badge color="green-6">{{ props.row.status }}</q-badge>
                  </div>
                  <div v-show="props.row.requestStatus_No == 9"><q-badge color="negative">{{ props.row.status }}</q-badge>
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-assigeTo="props">
                <q-td :props="props">
                  <q-chip class="ellipsis" color="blue-2" text-color="black" style="width:100%" v-show="props.row.assigeTo!=null&&props.row.emp_id!='admin'">
                    <q-avatar size="26px">
                      <img :src="props.row.img">
                    </q-avatar>
                    {{ props.row.assigeTo }}
                  </q-chip>
                  <q-chip class="ellipsis" v-show="props.row.emp_id=='admin'" style="width:100%"  color="blue-2">
                    <q-avatar color="mypink" text-color="white">A</q-avatar>
                    {{ props.row.assigeTo }}
                  </q-chip>
                </q-td>
              </template>
              <template v-slot:body-cell-del="props">
                <q-td :props="props">
                  <q-btn dense @click="onConfirmDelete(props.row)" v-show="props.row.requestStatus_No == 0" flat
                    size="10px">
                    <q-icon color="red-7" name="fa-solid fa-trash" />
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
  <Alert :info="alerts_confirm" @onConfirm="onDelete()" @onClose="alerts_confirm.confirm_show = false" />
  <Alert :info="alerts_success" @onClose="alerts_success.success_show = false" />
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import formService from '../service/form_service.js'
import moment from "moment";
import { useRoute, useRouter } from 'vue-router';
import Alert from '../components/Alert.vue'
import masterService from '../service/master_service.js'
import { useQuasar } from 'quasar'
export default {
  components: {
    Alert
  },
  setup() {
    const $q = useQuasar()
    let alerts_confirm = reactive({
      confirm_show: false,
      status: '',
      message: '',
      id: ''
    })
    let alerts_success = reactive({
      success_show: false,
      status: '',
      message: '',
    })
    const router = useRouter()
    const rows_TODO = reactive([
    ])
    const rows_MyRequest = reactive([
    ])
    let onload_TODO = () => {
      $q.loading.show()
      rows_TODO.splice(0)
      let playload = {
        module: "GetAllRequest_TODO",
        assignTo: sessionStorage.getItem("SessionEmpID"),
     
      }
      formService.FormData(playload).then(resp => {
        resp.data.forEach((item) => {
          rows_TODO.push(
            {
              id: item.id,
              requestNo: item.requestNo,
              requestDate: moment(item.requestDate).format('DD/MM/YYYY'),
              requestStatus_No: item.requestStatus_No,
              status: item.requestStatus,
              createBy: item.employeeName,
              assigeTo: item.assignTo_name,
              img: "https://cdn.quasar.dev/img/boy-avatar.png",
              emp_id:item.employeeID
            }
          )

        })
        rows_TODO.forEach((i, index) => {
            let playload = {
              module: "getImage",
              emp_id: i.emp_id
            }
            masterService.GetProfile_picture(playload).then(resp => {
              if (resp.data.status) {
                rows_TODO[index].img = resp.data.url
              }
             
            })
          })
          $q.loading.hide()
      })
    }
    let onload_MyRequest = () => {
      $q.loading.show()
      rows_MyRequest.splice(0)
      let playload = {
        module: "GetAllRequest_myRequest",
        employeeID: sessionStorage.getItem("SessionEmpID"),

      }
      formService.FormData(playload).then(resp => {
        resp.data.forEach((item) => {
          rows_MyRequest.push(
            {
              id: item.id,
              requestNo: item.requestNo,
              requestDate: moment(item.requestDate).format('DD/MM/YYYY'),
              requestStatus_No: item.requestStatus_No,
              status: item.requestStatus,
              createBy: item.employeeName,
              assigeTo: item.assignTo_name,
              img: "https://cdn.quasar.dev/img/boy-avatar.png",
              emp_id:item.assignTo
            }
          )
        })
        rows_MyRequest.forEach((i, index) => {
            let playload = {
              module: "getImage",
              emp_id: i.emp_id
            }
            masterService.GetProfile_picture(playload).then(resp => {
              if (resp.data.status) {
                rows_MyRequest[index].img = resp.data.url
              }
            
            })
          })
          $q.loading.hide()
      })
    }
    let onConfirmDelete = (item) => {
      alerts_confirm.message = 'คุณแน่ใจต้องการที่จะลบคำขอ'
      alerts_confirm.confirm_show = true
      alerts_confirm.id = item.id
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
          alerts_success.success_show = true
          alerts_success.message = 'ลบสำเร็จ'
        }
        onload_TODO()
        onload_MyRequest()
        $q.loading.hide()
      })
    }
    let onOpen = (item) => {
      router.push("/overtime/" + btoa(item.id)).then(() => { router.go() })
    }
    onMounted(() => {
      onload_TODO()
      onload_MyRequest()
    })
    return {
      router,
      tab: ref('TODO'),
      rows_TODO,
      rows_MyRequest,
      onload_TODO,
      onload_MyRequest,
      onOpen,
      onConfirmDelete,
      onDelete,
      alerts_confirm,
      alerts_success,
      columns_todo: [
        { name: 'view', label: 'ดู', field: 'view', headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
        { name: 'requestNo', label: 'เลขที่ใบ', field: 'requestNo', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        { name: 'requestDate', label: 'วันที่สร้าง', field: 'requestDate', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        { name: 'status', label: 'สถานะใบ', field: 'status', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        { name: 'createBy', label: 'ผู้สร้าง', field: 'createBy', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        { name: 'del', label: 'ลบ', field: 'del', headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
      ],
      columns_myrequest: [
        { name: 'view', label: 'ดู', field: 'view', headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
        { name: 'requestNo', label: 'เลขที่ใบ', field: 'requestNo', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        { name: 'requestDate', label: 'วันที่สร้าง', field: 'requestDate', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        { name: 'status', label: 'สถานะใบ', field: 'status', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        { name: 'assigeTo', label: 'ผู้ดำเนินการ', field: 'assigeTo', sortable: true, headerStyle: { width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }, style: { fontSize: '13px', textAlign: 'left' } },
        { name: 'del', label: 'ลบ', field: 'del', headerStyle: { width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }, style: { fontSize: '13px', textAlign: 'center' } },
      ]

    }
  }
}
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>