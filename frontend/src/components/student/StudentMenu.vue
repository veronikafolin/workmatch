<script setup>

</script>

<script>
import router from "../../router";

export default {
    data() {
        return {
            items: [
                {
                    label:'Jobs',
                    icon:'pi pi-fw pi-search',
                    to: '/studentjoboffers'
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
          rejectClass: 'p-button-text p-button-text',
          acceptClass: 'p-button-danger p-button-text',
          accept: () => {
            this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            router.replace({name: 'home'})
          },
          reject: () => {
            this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          }
        });
      }
    }
}
</script>

<template>

  <div class="card">
    <TabMenu :model="items">
    </TabMenu>
    <router-view />
  </div>

  <Toast />
  <ConfirmDialog></ConfirmDialog>

</template>
