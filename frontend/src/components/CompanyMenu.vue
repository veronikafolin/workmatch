<script setup>

</script>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label:'Students',
                    icon:'pi pi-fw pi-search'
                }, 
                {
                    label:'Messages',
                    icon:'pi pi-fw pi-comments'
                },
                {
                    label:'Profile',
                    icon:'pi pi-fw pi-user'
                },
                {
                    label:'Logout',
                    icon:'pi pi-fw pi-sign-out'
                }
            ]
        };
    },
    methods: {
    }
}
</script>

<template>
    <Menubar :model="items" />
</template>

<style>
.p-menubar{
    background-color: white;  /* Choose a better color */
}
</style>
