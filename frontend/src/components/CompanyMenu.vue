<script setup>

</script>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label:'Students',
                    icon:'pi pi-fw pi-search',
                    to: '/companyhome'
                }, 
                {
                    label:'Notifications',
                    icon:'pi pi-fw pi-bell',
                    to: '/companynotification'
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

