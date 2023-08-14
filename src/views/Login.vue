<!-- <template>
    <img src="./../assets/bg_login4.jpg" class="wave" alt="login-wave">
    <div class="row" >
        <div class="row full-width">
            <div class="col-md-8 offset-md-2 col-xs-12 " style="padding-top:8%;">
                <q-card flat class="text-black card" >
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <img src="./../assets/img_login.png" class="myimage" >
                        </div>
                        <div class="col-md-6 col-xs-12 ">
                            <div class="q-pa-xl">
                                <div class=" text-center fontIconLogin">
                                    Overtime System
                                </div>
                                <div >
                                    <q-input v-model="form.email" label="Email" label-color="mydrak" color="mypink" input-class="text-mydrak" 
                                        :error="v$.email.$error || l$.email.$error" :error-message="errorMessage.email" />
                                    <q-input type="password" v-model="form.password" label="Password" label-color="mydrak" color="mypink" input-class="text-mydrak" 
                                        :error="v$.password.$error || l$.password.$error"
                                        :error-message="errorMessage.password" />
                                </div>
                                <div style="padding-top:15px;">
                                    <q-btn label="Login" color="primary" no-caps @click="submitForm"
                                        class="q-ml-sm btn_add text-bold" />
                                    <q-btn label="Reset" color="primary" no-caps @click="onReset"
                                        class="q-ml-sm btn_clear text-bold" />
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>
    </div>
</template> -->
<template>
    <div class="mainDiv">
        <section>
            <div class="imgBx">
                <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGNvbXBhbnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
            </div>
            <div class="contentBx ">
                <div class="formBx">
                    <!-- <div class="fontIconLogin">
                        Overtime System
                    </div> -->
                    <h2>เข้าสู่ระบบ</h2>
                    <div class="inputBx">
                        <span>อีเมลล์</span>
                        <q-input v-model="form.email" color="mydrak" input-class="text-mydrak" outlined dense
                            :error="v$.email.$error || l$.email.$error" :error-message="errorMessage.email" />
                    </div>
                    <div class="inputBx">
                        <span>รหัสผ่าน</span>
                        <q-input type="password" v-model="form.password" color="mypink" input-class="text-mydrak" outlined dense
                            :error="v$.password.$error || l$.password.$error" :error-message="errorMessage.password" />
                    </div>
                    <q-btn label="ลงชื่อเข้าใช้" color="primary" no-caps @click="submitForm" class="q-ml-sm btn_add text-bold" />
                    <q-btn label="ล้าง" color="primary" no-caps @click="onReset" class="q-ml-sm btn_clear text-bold" />
                </div>
            </div>
        </section>
    </div>
   
</template>
  
<script>
import { ref, reactive, computed } from 'vue-demi';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router'
import master_service from '../service/master_service';
import { useQuasar } from 'quasar'
import En_password from '../service/encrypt_password.js'
export default {
    setup() {
        const router = useRouter()
        const $q = useQuasar()
        let form = reactive({
            email: '',
            password: '',
        })
        let login = reactive({
            email: null,
            password: null,
            data: null
        })
        let errorMessage = reactive({
            email: '',
            password: ''
        })
        let onSubmit = () => {
            $q.loading.show()
            let playload = {
                module: "login",
                email: form.email,
                password: En_password.Encrypt(form.password),

            }
            master_service.GetEmpInfo(playload).then(resp => {
                console.log("Login->>>>", resp.data)
                if (resp.data.email) {
                    login.email = 'have'
                    if (resp.data.password) {
                        login.password = 'have'
                        login.data = resp.data.data[0]

                    }
                    else {
                        login.password = ''
                    }
                }
                else {
                    login.password = 'have'
                }
                checklogin()
                $q.loading.hide()
            })
        }
        let onReset = () => {
            form.email = null;
            form.password = null;
            v$.value.$reset()
            l$.value.$reset()
        }
        const rules1 = computed(() => {
            return {
                email: { required, email },
                password: { required },
            }
        });
        const rules2 = computed(() => {
            return {
                email: { required },
                password: { required },
            }
        });
        const v$ = useVuelidate(rules1, form);
        const l$ = useVuelidate(rules2, login);
        const checklogin = async () => {
            const isFormCorrect = await l$.value.$validate();
            if (!isFormCorrect) {
                console.log(l$.value.$errors)
                errorMessage.email = 'ไม่พบอีเมลล์นี้ในระบบ'
                errorMessage.password = 'รหัสผ่านไม่ถูกต้อง'
            }
            else {
                localStorage.setItem("UserINFO", JSON.stringify(login.data));
                router.push('/').then(() => { router.go() })
            }
        }
        const submitForm = async () => {
            v$.value.$reset()
            l$.value.$reset()
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) {
                console.log(v$.value.$errors)
                errorMessage.email = 'กรุณาระบุอีเมลล์ให้ถูกต้อง'
                errorMessage.password = 'กรุณาระบุรหัสผ่าน'
            }
            else {
                console.log(isFormCorrect)
                onSubmit()
            }
        }


        return {
            $q,
            rules1,
            rules2,
            v$,
            l$,
            form,
            submitForm,
            onSubmit,
            onReset,
            login,
            checklogin,
            errorMessage,
        };
    },


};
</script>
<style scoped>

.fontIconLogin{
    font-family: 'Pacifico', cursive;
    font-size: 35px;
    color:#ffffff;
    text-shadow: #d11472 0.1em 0.1em 0.2em
  }
.mainDiv{
    padding: 50px;
    height: 100vh;
    background: linear-gradient(225deg, #e91e63, #03a9f4);

}

section {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
}

section .imgBx {
    position: relative;
    width: 50%;
    height: 100%;
}

section .imgBx img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

section .imgBx:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(225deg, #e91e63, #03a9f4);
    z-index: 1;
    mix-blend-mode: screen;
}

section .contentBx {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    background: #ffffff;
}

section .contentBx .formBx {
    width: 50%;
}

section .contentBx .formBx h2 {
    color: #607d8b;
    font-weight: 600;
    font-size: 1.5em;
    text-transform: uppercase;
    margin-block: 20px;
    border-bottom: 4px solid #ff4584;
    display: inline-block;
    letter-spacing: 1px;
}

section .contentBx .formBx .inputBx {
    margin-bottom: 5px;
}

section .contentBx .formBx .inputBx span {
    font-size: 16px;
    margin-bottom: 5px;
    display: inline-block;
    color: #607d8b;
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 1px;
}

@media(max-width: 768px) {
    .mainDiv{
        padding:0px;
    }
    section .imgBx {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    section .contentBx {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: #ffffff00;
    }

    section .contentBx .formBx {
        width: 100%;
        padding: 30px;
        background: rgba(255, 255, 255, 0.9);
        margin: 30px;
    }

}
</style>