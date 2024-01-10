<script setup>

</script>

<script>
import router from "../../router";
import axios from "axios";

export default {
    data() {
        return {
            student: '',
            items: [
                {
                    label:'Home',
                    icon:'pi pi-fw pi-home',
                    to: '/studenthome'
                }, 
                {
                    label:'Notifications',
                    icon:'pi pi-fw pi-bell',
                    to: '/studentnotification'
                },
                {
                    label:'Profile',
                    icon:'pi pi-fw pi-user',
                    to: '/studentprofile'
                },
                {
                    label:'Logout',
                    icon:'pi pi-fw pi-sign-out',
                    command: () => {
                      this.confirmLogOut();
                    }
                }
            ]
        };
    },
    methods: {
      confirmLogOut() {
        this.$confirm.require({
          message: 'Are you sure you want to log out?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          rejectClass: 'p-button-text',
          acceptClass: 'p-button-danger p-button-text',
          accept: () => {
            router.replace({name: 'home'})
          },
          reject: () => {

          }
        });
      },
      requestStudent() {
        let studentId = localStorage.userId;
        axios
            .get(`http://localhost:3000/api/student?id=${studentId}`)
            .then(res => {
              this.student = res.data;
            });
      }
    },
  beforeMount(){
    this.requestStudent();
  }
}
</script>

<template>

  <div class="card" id="menu">

    <Menubar :model="items">

      <template #start>
        <img class="h-2rem logo-navbar-left" src="../../assets/logo.jpeg" alt="Workmatch logo"/>
      </template>

      <template #end>
        <div class="flex align-items-center gap-2">
          <span id="welcome">Hi, {{student.name}}!</span>
        </div>
        <img class="h-2rem logo-navbar-right" src="../../assets/logo.jpeg" alt="Workmatch logo"/>
      </template>

    </Menubar>

  </div>

</template>
