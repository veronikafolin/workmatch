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
        <img class="h-2rem" src="../../assets/logo.jpeg" alt="Workmatch logo"/>
      </template>

<!--      <template #item="{item, props, root}">-->
<!--        <div class="flex align-items-center gap-2">-->
<!--          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>-->
<!--            <a v-ripple class="flex align-items-center" @click="navigate">-->
<!--              <span :class="item.icon" />-->
<!--              <span class="ml-2">{{ item.label }}</span>-->
<!--              <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" ></Badge>-->
<!--            </a>-->
<!--          </router-link>-->
<!--          <a v-else v-ripple class="flex align-items-center">-->
<!--            <span :class="item.icon" />-->
<!--            <span class="ml-2">{{ item.label }}</span>-->
<!--          </a>-->
<!--        </div>-->
<!--      </template>-->

      <template #end>
        <div class="flex align-items-center gap-2">
          <span id="welcome">Hi, {{student.name}}!</span>
        </div>
      </template>

    </Menubar>

  </div>

</template>
