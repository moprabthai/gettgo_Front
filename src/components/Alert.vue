<template>
    <q-dialog v-model="Success_Show" transition-show="rotate" transition-hide="rotate">
        <q-card style="width: 250px; max-width: 80vw;">
            <q-card-section class="items-center" align="center">
                <q-avatar icon="fa-solid fa-check" color="green-7" text-color="white" />
            </q-card-section>
            <q-card-section class="q-pt-none" align="center">
                <b>สำเร็จ!!</b>
            </q-card-section>
            <q-card-section class="q-pt-none" align="center">
                {{ INFO.message }}
            </q-card-section>
            <q-card-actions align="center">
                <q-btn label="OK" no-caps class="btn_add text-bold"  @click="Close()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="Error_Show" transition-show="rotate" transition-hide="rotate">
        <q-card style="width: 250px; max-width: 80vw;">
            <q-card-section class="items-center" align="center">
                <q-avatar icon="fa-solid fa-xmark" color="red-6" text-color="white" />
            </q-card-section>
            <q-card-section class="q-pt-none" align="center">
                <b>ล้มเหลว!!</b>
            </q-card-section>
            <q-card-section class="q-pt-none" align="center">
                {{ INFO.message }}
            </q-card-section>
            <q-card-actions align="center">
                <q-btn label="OK" no-caps class="btn_add text-bold"  @click="Close()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="Confirm_Show" transition-show="rotate" transition-hide="rotate">
        <q-card style="width: 400px; max-width: 80vw;">
            <q-card-section class="items-center" align="center">
                <q-avatar icon="fa-solid fa-exclamation" color="mypink" text-color="white" />
            </q-card-section>
            <q-card-section class="q-pt-none" align="center">
                {{ INFO.message }}
            </q-card-section>
            <q-card-actions align="center">
                <q-btn  label="ยืนยัน" no-caps class="btn_add text-bold"  @click="Confirm()" />
                <q-btn  label="ยกเลิก" no-caps class="btn_search text-bold" @click="Close()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { reactive,computed } from 'vue-demi'
export default {
    name: 'Alert',
    props: [
        'info'
    ],
    emits: [
        'onConfirm',
        'onClose',
    ],

    setup(props, {emit} ){

        const INFO = computed(()=>{
            return props.info
        })
        const Success_Show = computed(()=>{
            return props.info.success_show
        })
        const Error_Show = computed(()=>{
            return props.info.error_show
        })
        const Confirm_Show = computed(()=>{
            return props.info.confirm_show
        })

        const Confirm = ()=> {            
            emit('onConfirm')
        }
        const Close = ()=>{
            emit('onClose')
        }

        return{
            INFO,
            Success_Show,
            Error_Show,
            Confirm_Show,
            Confirm,
            Close,
        }

    }

}
</script>

<style>

</style>