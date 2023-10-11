<script setup>

</script>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label:'People',
                    icon:'pi pi-fw pi-search',
                    to: '/companyhome'
                },
                {
                  label:'Job Offers',
                  icon:'pi pi-fw pi-briefcase',
                  to: '/'
                },
                {
                    label:'Notifications',
                    icon:'pi pi-fw pi-bell',
                    to: '/companynotification'
                },
                {
                  label:'Profile',
                  icon:'pi pi-fw pi-user',
                  to: '/'
                },
                {
                  label:'Sign out',
                  icon:'pi pi-fw pi-sign-out',
                  to: '/'
                }
            ]
        };
    }
}
</script>

<template>

  <div class="card">
    <TabMenu :model="items">
    </TabMenu>
    <router-view />
  </div>

</template>

