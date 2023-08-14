<template>
  <div v-if="login == false">
    <Login></Login>
  </div>

  <div v-if="login == true">
    <q-layout view="hHh lpR fFf" class="bg-grey-4">
      <q-header elevated class="bg_white " height-hint="64">
        <q-toolbar class="GNL__toolbar">
          <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" class="q-mr-sm" />
          <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
            <img src="./assets/gettgo.jpg" style="height: 35px;" />
          </q-toolbar-title>
          <q-space />
          <div class="q-gutter-sm row items-center no-wrap">
          <UserInfo :info="UserINFO" />
          </div>

        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg_dark" :width="250">
        <q-scroll-area class="fit">
          <q-list padding class="text-grey-8">
            <SideBar/>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <RouterView />
      </q-page-container>
    </q-layout>
  </div>

</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { fasEarthAmericas, fasFlask } from '@quasar/extras/fontawesome-v6'
import SideBar from './components/SideBar.vue'
import UserInfo from './components/UserInfo.vue'
import { RouterLink, RouterView } from 'vue-router'
import Login from './views/Login.vue'

export default {
  name: 'GoogleNewsLayout',
  components: {
    SideBar,
    UserInfo,
    Login,
  },
  setup() {
    let login = ref(false)
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const showAdvanced = ref(false)
    const showDateOptions = ref(false)
    const exactPhrase = ref('')
    const hasWords = ref('')
    const excludeWords = ref('')
    const byWebsite = ref('')
    const byDate = ref('Any time')
    let Userlogin = ref(null)
    let UserINFO = reactive({
      active:null,
      email:null,
      emp_id:null,
      fname:null,
      isadmin:null,
      lname:null,
      password:null,
      salary:null,
      dep_name:null,
      dep_id:null,
    })

    function onClear() {
      exactPhrase.value = ''
      hasWords.value = ''
      excludeWords.value = ''
      byWebsite.value = ''
      byDate.value = 'Any time'
    }
    function changeDate(option) {
      byDate.value = option
      showDateOptions.value = false
    }

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    let checkLogin=()=>{
      if(Userlogin){
        login.value=true
        console.log(Userlogin)
        UserINFO.active=Userlogin.active
        UserINFO.email=Userlogin.email
        UserINFO.emp_id=Userlogin.emp_id
        UserINFO.fname=Userlogin.fname
        UserINFO.isadmin=Userlogin.isadmin
        UserINFO.lname=Userlogin.lname
        UserINFO.password=Userlogin.password
        UserINFO.salary=Userlogin.salary
        UserINFO.dep_name=Userlogin.department.dep_name
        UserINFO.dep_id=Userlogin.department.dep_id

        sessionStorage.setItem("SessionEmpID", Userlogin.emp_id);
        sessionStorage.setItem("SessionEmpFullName", Userlogin.fname+" "+Userlogin.lname);
        sessionStorage.setItem("SessionIsAdmin", Userlogin.isadmin);
      }
    }
    onMounted(() => {
      Userlogin = JSON.parse(localStorage.getItem("UserINFO"))
      
      checkLogin()
      
    })

    return {
      login,
      leftDrawerOpen,
      search,
      showAdvanced,
      showDateOptions,
      exactPhrase,
      hasWords,
      excludeWords,
      byWebsite,
      byDate,



      onClear,
      changeDate,
      toggleLeftDrawer,
      checkLogin,
      UserINFO,
    }
  }
}
</script>

<style lang="sass">
.GNL
  &__toolbar
    height: 64px
    
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
  
    .q-item__section--avatar
      .q-icon
        color: white
    .q-item__section
      .q-item__label
          color: #ffffff
          letter-spacing: .01785714em
          font-size: 0.8rem
          font-weight: 500
          line-height: 1.25rem
     
  

  &__drawer-footer-link
  
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>