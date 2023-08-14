<template>
    <q-btn round flat>
        <div class="q-pa-md q-gutter-y-md">
            <div class="q-gutter-sm">
                <q-chip color="mypink" text-color="white">
                    <q-avatar color="mydrak" size="26px" >
                        <img :src="ImageProfile">
                    </q-avatar>
                    {{ UserINFO.fname }}
                </q-chip>
            </div>
        </div>
        <q-tooltip>{{ UserINFO.fname }}</q-tooltip>
        <q-menu>
            <q-card style="max-width:auto">
                <q-card-section align="center">
                    <q-avatar size="96px" style="margin-left:-10px;">
                        <img :src="ImageProfile">
                    </q-avatar>
                    <q-btn round color="mygray" icon="photo_camera" :size="'10px'" style="margin: 65px 0 0 -62.5px;"
                        @click="onChangeProfile()" />
                    <div class="text-subtitle2">{{ UserINFO.email }}</div>
                </q-card-section>
                <q-separator />
                <q-card-section align="left">
                    <div class="text-subtitle2">รหัสพนักงาน : {{ UserINFO.emp_id }}</div>
                    <div class="text-subtitle2">ชื่อ สกุล : {{ UserINFO.fname }} {{ UserINFO.lname }}</div>
                    <div class="text-subtitle2">แผนก : {{ UserINFO.dep_name }}</div>
                    <div class="text-subtitle2">เงินเดือน : {{ UserINFO.salary }}</div>
                    <div class="text-subtitle2 text-primary" style="cursor: pointer;" @click="onOpenDailog()">
                        เปลี่ยนรหัสผ่าน</div>

                </q-card-section>
                <q-separator />
                <q-card-actions align="center">
                    <q-btn class="btn_add text-weight-bolder" label="ลงชื่อออก" push size="sm" @click="onLogout" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-menu>
    </q-btn>

    <q-dialog v-model="dailog.show" transition-show="rotate" transition-hide="rotate">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-toolbar class="bg_dark">
                <q-toolbar-title>
                    <div class="text-h6">เปลี่ยนรหัสผ่าน</div>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <q-card-section>
                <div class="q-gutter-sm q-pa-md">
                    <div class="row flex items-center justify-center">
                        <div class="col-3 text-bold">
                            รหัสผ่านเดิม :
                        </div>
                        <div class="col-6 ">
                            <q-input :dense="true" color="indigo-10" v-model="dailog.old_pass" type="password"
                                :error="v$.old_pass.$error || l$" :error-message="errorMessage.old_pass" />
                        </div>
                    </div>
                    <div class="row flex items-center justify-center">
                        <div class="col-3 text-bold">
                            รหัสผ่านใหม่ :
                        </div>
                        <div class="col-6">
                            <q-input maxlength="20" :dense="true" color="indigo-10" v-model="dailog.new_pass"
                                type="password" :error="v$.new_pass.$error" :error-message="errorMessage.new_pass" />
                        </div>
                    </div>
                    <div class="row justify-center ">
                        <div>
                            <q-card-section class="q-pt-md">
                                <div class="q-gutter-md">
                                    <q-btn icon="save" label="บันทึก" no-caps class="btn_add text-bold"
                                        @click="onCheckRequired()" />
                                    <q-btn label="ปิด"  no-caps class="btn_search text-bold" v-close-popup />
                                </div>
                            </q-card-section>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
    <q-dialog v-model="Profile.show">
        <q-card>
            <q-card-section class="row items-center">
                <span class="q-ml-sm">เลือกรูปภาพเป็นประเภทไฟล์ Jpeg หรือ PNG เท่านั้น</span>
            </q-card-section>
            <q-card-actions align="center">
                <q-file color="teal" filled v-model="Profile.file" label="เลือกรูปภาพ"
                :error="Profile.type"
                :error-message="'เฉพาะไฟล์ประเภท Jpeg หรือ PNG เท่านั้น'"
                accept="image/*"
                :filter="checkFileType"  @rejected="onRejected"
                    @update:model-value="onUpdateImage()">
                    <template v-slot:prepend>
                        <q-icon name="cloud_upload" />
                    </template>
                </q-file>
            </q-card-actions>
        </q-card>
    </q-dialog>
    <Alert :info="alerts_confirm" @onConfirm="onChangePassword()" @onClose="alerts_confirm.confirm_show = false" />
    <Alert :info="alerts_success" @onClose="alerts_success.success_show = false" />
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import Alert from '../components/Alert.vue'
import master_service from '../service/master_service';
import En_password from '../service/encrypt_password.js'
import { useQuasar } from 'quasar'
export default {
    name: 'UserInfo',
    components: {
        Alert
    },
    props: [
        'info'
    ],
    setup(props) {
        const $q = useQuasar()
        const router = useRouter()
        let ImageProfile = ref("https://cdn.quasar.dev/img/boy-avatar.png")
        let alerts_confirm = reactive({
            confirm_show: false,
            status: '',
            message: '',
        })
        let alerts_success = reactive({
            success_show: false,
            status: '',
            message: '',
        })
        let errorMessage = reactive({
            old_pass: 'กรุณาระบุรหัสผ่าน',
            new_pass: 'กรุณาระบุรหัสผ่าน'
        })
        let UserINFO = reactive({
            active: null,
            email: props.info.email,
            emp_id: props.info.emp_id,
            fname: props.info.fname,
            isadmin: null,
            lname: props.info.lname,
            password: null,
            salary: props.info.salary,
            dep_name: props.info.dep_name,
            dep_id: null,
        })
        let dailog = reactive({
            show: false,
            old_pass: null,
            new_pass: null,
        })
        let Profile = reactive({
            show: false,
            file: null,
            type:false

        })
        let onOpenDailog = () => {
            v$.value.$reset()
            l$.value = false
            dailog.show = true
            dailog.old_pass = null
            dailog.new_pass = null
        }
        let onLogout = () => {
            localStorage.clear()
            router.push('/').then(() => { router.go() })
        }

        const rules1 = computed(() => {
            return {
                old_pass: { required },
                new_pass: {
                    required,
                    valid: function (value) {
                        const containsUppercase = /[A-Z]/.test(value)
                        const containsLowercase = /[a-z]/.test(value)
                        const containsNumber = /[0-9]/.test(value)
                        return containsUppercase && containsLowercase && containsNumber
                    },
                    minLength: minLength(8),
                },
            }
        });
        const v$ = useVuelidate(rules1, dailog);
        let l$ = ref(false)
        let onCheckRequired = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) {
                errorMessage.old_pass = 'กรุณาระบุรหัสผ่าน'

                console.log(v$.value.new_pass.$errors[0])
                switch (v$.value.new_pass.$errors[0].$validator) {
                    case 'required':
                        errorMessage.new_pass = 'กรุณาระบุรหัสผ่าน'
                        break;
                    case 'valid':
                        errorMessage.new_pass = 'รหัสผ่านต้องมีตัวพิมพ์ใหญ่ พิมพ์เล็ก และตัวเลข '
                        break;
                    case 'minLength':
                        errorMessage.new_pass = 'รหัสผ่านต้องมีอย่างน้อย 8-20 ตัว'
                        break;
                }
            }
            else {
                alerts_confirm.confirm_show = true,
                    alerts_confirm.message = 'คุณแน่ใจที่จะเปลี่ยนรหัสผ่าน'
            }
        }
        let onChangePassword = () => {
            alerts_confirm.confirm_show = false
            let playload = {
                module: 'change_password',
                emp_id: UserINFO.emp_id,
                old_pass: En_password.Encrypt(dailog.old_pass),
                new_pass: En_password.Encrypt(dailog.new_pass),
            }
            master_service.GetEmpInfo(playload).then(resp => {
                if (resp.data.status) {
                    l$.value = false
                    alerts_success.success_show = true
                    alerts_success.message = resp.data.message
                    dailog.show = false
                }
                else {
                    l$.value = true
                    errorMessage.old_pass = resp.data.message
                }
            })
        }
        let GetImageProfile = () => {
            let playload = {
                module: "getImage",
                emp_id: UserINFO.emp_id
            }
            master_service.GetProfile_picture(playload).then(resp => {
                console.log(resp.data.status)
                if (resp.data.status) {
                    ImageProfile.value = resp.data.url
                }
            })
        }
        let onChangeProfile = () => {
            Profile.file=null
            Profile.show = true
        }
        let onUpdateImage = () => {
            $q.loading.show()
            Profile.type=false
            let formData = new FormData();
            formData.append('module', 'uploadProfile');
            formData.append('emp_id', UserINFO.emp_id);
            formData.append('image', Profile.file);
            master_service.GetProfile_picture(formData).then(resp => {
                console.log(resp.data.status)
                Profile.show = false
                window.location.reload();
                $q.loading.hide()
            })
        }
        onMounted(() => {
            GetImageProfile()
        })

        return {
            dailog,
            UserINFO,
            onLogout,
            router,
            alerts_confirm,
            alerts_success,
            onOpenDailog,
            onCheckRequired,
            onChangePassword,
            rules1,
            errorMessage,
            v$,
            l$,
            GetImageProfile,
            ImageProfile,
            onChangeProfile,
            Profile,
            onUpdateImage,
            checkFileType(files) {
                return files.filter(file => file.type === 'image/jpeg'||file.type === 'image/png')
            },
            onRejected(rejectedEntries) {
                Profile.type=true
                Profile.file=null
   
            }
        }
    }
}
</script>

<style>

</style>