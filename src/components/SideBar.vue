<template>
    <q-list padding class="text-grey-8">
        <q-div v-ripple v-for="link in links1" :key="link.text">
            <q-item class="GNL__drawer-item" :disable="link.Active > UserRole.active" :to="link.url" clickable>
                <q-item-section avatar>
                    <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label ><span class="text-weight-bolder">{{ link.text }}</span></q-item-label>
                </q-item-section>
            </q-item>
        </q-div>
        <q-separator inset class="q-my-sm" style="background-color: #fff;" />
        <q-div v-ripple v-for="link in links2" :key="link.text">
            <q-item class="GNL__drawer-item" v-ripple v-if="link.Role <= UserRole.isadmin" :to="link.url" clickable>
                <q-item-section avatar>
                    <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label ><span class="text-weight-bolder">{{ link.text }}</span></q-item-label>
                </q-item-section>
            </q-item>
        </q-div>
        <q-separator inset class="q-my-sm" />
        <!-- <q-item class="GNL__drawer-item" v-ripple v-for="link in links3" :key="link.text" clickable>
            <q-item-section>
                <q-item-label>{{ link.text }}
                    <q-icon v-if="link.icon" :name="link.icon" />
                </q-item-label>
            </q-item-section>
        </q-item> -->
        <div class="q-mt-md">
            <!-- <div class="flex flex-center q-gutter-xs">
                <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">Privacy</a>
                <span> · </span>
                <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
                <span> · </span>
                <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Google</a>
            </div> -->
        </div>
    </q-list>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { fasEarthAmericas, fasFlask } from '@quasar/extras/fontawesome-v6'
export default {
    name: 'SideBar',
    setup() {
        let UserRole = reactive({
            isadmin: null,
            active: null,
        })
        onMounted(() => {
            let Userlogin = JSON.parse(localStorage.getItem("UserINFO"))
            if (Userlogin) {
                if (Userlogin.department.dep_id == 1) {
                    UserRole.isadmin = 1
                    if (Userlogin.isadmin == 1) {
                        UserRole.isadmin = 2
                    }
                }
                else {
                    UserRole.isadmin = 0
                }
                UserRole.active = parseInt(Userlogin.active)
            }

            console.log(UserRole)

        })


        return {
            UserRole,
            links1: [
                { icon: 'web', text: 'แผงควบคุม', url: '/' ,Active: 0},
                { icon: 'star_border', text: 'ขอล่วงเวลา', url:'/overtime' ,Active: 1 },
            ],

            links2: [
                { icon: 'fa-solid fa-user', text: 'พนักงาน', url: '/master/employee', Role: 2 },
                { icon: 'domain', text: 'แผนก', url: '/master/department', Role: 1 },
                { icon: 'fa-solid fa-users', text: 'สายบัญชาการ', url: '/master/approver', Role: 1 },
                { icon: 'fa-solid fa-clock', text: 'กะงาน', url: '/master/shift', Role: 1 },
                { icon: 'fa-solid fa-file', text: 'รายงาน', url: '/master/report', Role: 1 },
                
               
            ],

        }
    }

}
</script>

<style lang="sass">

</style>