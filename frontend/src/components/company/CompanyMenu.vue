<script setup>

</script>

<script>

import io from 'socket.io-client';

export default {
    data() {
        return {
            socket: io(),
            notification: '',
            items: [
                {
                    label:'People',
                    icon:'pi pi-fw pi-search',
                    to: '/studentlist'
                },
                {
                  label:'Job Offers',
                  icon:'pi pi-fw pi-briefcase',
                  to: '/companyjoboffers'
                },
                {
                    label:'Notifications',
                    icon:'pi pi-fw pi-bell',
                    to: '/companynotification'
                },
                {
                  label:'Profile',
                  icon:'pi pi-fw pi-user',
                  to: '/companyprofile'
                },
                {
                  label:'Sign out',
                  icon:'pi pi-fw pi-sign-out',
                  to: '/'
                }
            ]
        };
    },
  beforeMount() {
    this.socket.on('notification', (data) => {
      this.notification = data.notification
      this.$toast.add({ severity: 'info', summary: 'New notification', detail: this.notification, life: 3000 });
    })
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

</template>

