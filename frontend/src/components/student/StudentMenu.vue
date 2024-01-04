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

  <div class="card">

    <Menubar :model="items">

      <template #start>
        <div class="flex align-items-center gap-2">
          <img class="h-3rem" src="../../assets/logo.jpeg" alt="Workmatch logo"/>
          <span id="welcome">Welcome, {{student.name}}!</span>
        </div>
      </template>

    </Menubar>

  </div>

</template>

<style>

#welcome{
  font-weight: bold;
  font-size: 100%;
  text-align: center;
  font-family: 'Roboto', Arial, sans-serif;
}

</style>
